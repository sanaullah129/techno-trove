'use client';

import { Order, User } from '@prisma/client';
import React, { useCallback } from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import { formatPrice } from '@/utils/formatElements';
import HeadingDesign from '@/app/components/HeadingDesign';
import ActionButtons from '@/app/components/ActionButtons';
import Status from '@/app/components/Status';
import { TiTick } from "react-icons/ti";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { BsTruck } from "react-icons/bs";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { FiClock } from "react-icons/fi";

interface OrderClientProps {
  orders: ExtendedOrder[];
};

type ExtendedOrder = Order & {
    user: User
};

const OrderClient: React.FC<OrderClientProps> = ({ orders }) => {

  const router = useRouter();

  let rows: any = [];
  if(orders){
    rows = orders.map((order)=>{
      return {
        id: order.id,
        name: order.user.name,
        price: formatPrice(order.amount/100),
        paymentStatus: order.status,
        date: moment(order.createDate).fromNow(),
        deliveryStatus: order.deliveryStatus
      };
    });
  };

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 220},
    {field: 'customer', headerName: 'Customer Name', width: 130},
    {field: 'amount', headerName: 'Amount(INR)', width: 130, renderCell:(params)=>{
      return (<div className='font-bold text-slate-800' >{params.row.amount}</div>)
    }},
    {field: 'paymentStatus', headerName: 'Payment Status', width: 130, renderCell:(params)=>{
        return (
        <div>
          { params.row.paymentStatus === 'pending' ? 
          <Status text='pending' icon={FiClock} bg='bg-slate-200' color='black' />
          : params.row.paymentStatus === 'completed' ? 
          <Status text='dispatched' icon={TiTick} bg='bg-green-200' color='black' />
          : <></> }
        </div>)
      }},
    {field: 'deliveryStatus', headerName: 'Delivery Status', width: 130, renderCell:(params)=>{
      return (
      <div>
        { params.row.deliveryStatus === 'pending' ? 
        <Status text='pending' icon={FiClock} bg='bg-slate-200' color='black' />
        : params.row.deliveryStatus === 'dispatched' ? 
        <Status text='dispatched' icon={BsTruck} bg='bg-purple-200' color='black' />
        : <Status text='delivered' icon={MdOutlineFileDownloadDone} bg='bg-green-200' color='black' /> }
      </div>)
    }},
    { field:'date', headerName: 'Date', width: 130 },
    {field: 'action', headerName: 'Actions', width: 200, renderCell:(params)=>{
      return (
      <div className='flex justify-between gap-4 w-full'>
        <ActionButtons icon={MdOutlineRemoveRedEye} onClick={()=>{router.push(`/order/${params.row.id}`)}} />
      </div>)
    }},
  ];
  
  return (
    <div className='w-[1150px] m-auto text-xl' >
      <div className='mb-4 mt-8'>
        <HeadingDesign title='Your Orders' center />
      </div>
      <div style={{height: 600, width: '100%' }}>
        <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
          },
        }}
        pageSizeOptions={[9, 30]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      </div>      
    </div>
  )
}

export default OrderClient;
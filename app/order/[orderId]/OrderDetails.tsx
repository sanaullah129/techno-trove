'use client';

import HeadingDesign from '@/app/components/HeadingDesign';
import Status from '@/app/components/Status';
import { formatPrice } from '@/utils/formatPrice';
import { Order } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FiClock } from "react-icons/fi";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { BsTruck } from "react-icons/bs";

interface OrderDetailsProp{
    order: Order;
}

const OrderDetails:React.FC<OrderDetailsProp> = ({ order }) => {
console.log("delivery", order.deliveryStatus);
  return (
    <div className='max-w-[1150px] m-auto flex flex-col gap-2'>
        <div className='mt-8'>
            <HeadingDesign title='Order Details' />    
        </div>
        <div>Order ID: {order.id} </div>
        <div>Total Amount: {" "} <span className='font-bold'>{formatPrice(order.amount)}</span> </div>
        <div className='flex items-center gap-2'>
            <div>Payment Status: </div>
            <div>
                {order.status === 'pending'? 
                    <Status text='pending' icon={FiClock} bg='bg-rose-200' color='black' /> 
                    : order.status === 'completed' ?
                    <Status text='completed' icon={MdOutlineFileDownloadDone} bg='bg-green-200' color='black' /> : <></>  }
            </div>
        </div>
        <div className='flex items-center gap-2'>
            <div>Delivery Status: </div>
            <div>
                {order.deliveryStatus === 'pending'? 
                    <Status text='pending' icon={FiClock} bg='bg-rose-200' color='black' /> 
                    : order.deliveryStatus === 'dispatched' ? <Status text='dispatched' icon={BsTruck} bg='bg-purple-200' color='black' />  : 
                    order.deliveryStatus === 'delivered' ?
                    <Status text='delivered' icon={MdOutlineFileDownloadDone} bg='bg-green-200' color='black'/> : <></>  }
            </div>
        </div>
    </div>
  )
}

export default OrderDetails
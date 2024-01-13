'use client';

import { Product } from '@prisma/client';
import React, { useCallback } from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import { formatPrice } from '@/utils/formatElements';
import HeadingDesign from '@/app/components/HeadingDesign';
import ActionButtons from '@/app/components/ActionButtons';
import Status from '@/app/components/Status';
import { TiTick } from "react-icons/ti";
import { MdCancel } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineCached } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import firebaseApp from '@/libs/firebase';

interface ManageProductsClientProps {
  products: Product[];
};

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({ products }) => {

  const router = useRouter();
  const storage = getStorage(firebaseApp);

  let rows: any = [];
  if(products){
    rows = products.map((product)=>{
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images
      };
    });
  };

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 220},
    {field: 'name', headerName: 'Name', width: 220},
    {field: 'price', headerName: 'Price(INR)', width: 100, renderCell:(params)=>{
      return (<div className='font-bold text-slate-800' >{params.row.price}</div>)
    }},
    {field: 'category', headerName: 'Category', width: 100},
    {field: 'brand', headerName: 'Brand', width: 100},
    {field: 'stock', headerName: 'Stock', width: 120, renderCell:(params)=>{
      return (
      <div>
        { params.row.inStock === true ? 
        <Status text='In Stock' icon={TiTick} bg='bg-teal-200' color='black' />
        : <Status text='Out of Stock' icon={MdCancel} bg='bg-rose-200' color='black' /> }
      </div>)
    }},
    {field: 'action', headerName: 'Actions', width: 200, renderCell:(params)=>{
      return (
      <div className='flex justify-between gap-4 w-full'>
        <ActionButtons icon={MdOutlineCached} onClick={() => handleToggleStock(params.row.id, params.row.inStock)} />
        <ActionButtons icon={MdOutlineDeleteOutline} onClick={()=>handleDeleteProduct(params.row.id, params.row.images)} />
        <ActionButtons icon={MdOutlineRemoveRedEye} onClick={()=>{router.push(`/product/${params.row.id}`)}} />
      </div>)
    }},
  ];

  const handleToggleStock = useCallback((id: string, inStock: boolean) => {
    toast.promise(
      axios.put('/api/product', {
        id,
        inStock: !inStock,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try again');
      })
      .finally(() => {
        router.refresh();
      }), {
      loading: 'Updating product stock...',
      success: 'Product status changed successfully',
      error: 'Failed to change product stock, please try again',
    });
  }, []);

  const handleDeleteProduct = useCallback(async (id: string, images: any[]) => {
    toast.promise(
      new Promise<void>(async (resolve, reject) => {
        try {
          await handleImageDelete(images);
          await axios.delete(`/api/product/${id}`);
          resolve();
        } catch (error) {
          reject(error);
        } finally {
          router.refresh();
        }
      }), {
      loading: 'Deleting product...',
      success: 'Product deleted successfully',
      error: 'Failed to delete product, please try again',
    });
  }, []);

  const handleImageDelete = async (images: any[]) => {
    try {
      for (const item of images) {
        if (item.image) {
          const imageRef = ref(storage, item.image);
          await deleteObject(imageRef);
        }
      }
    } catch (error) {
      throw error;
    }
  };
  
  return (
    <div className='w-[1150px] m-auto text-xl' >
      <div className='mb-4 mt-8'>
        <HeadingDesign title='Manage Products' center />
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

export default ManageProductsClient
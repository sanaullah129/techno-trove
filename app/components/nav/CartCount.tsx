'use client';

import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation'
import { FiShoppingBag } from 'react-icons/fi'

const CartCount = () => {

  const {cartTotalQty} = useCart();
  const router = useRouter();

  return (
    <div className='relative cursor-pointer' onClick={()=>{router.push("/cart")}}>
        <div className='text-3xl'>
            <FiShoppingBag />
        </div>
        <span className=' absolute top-[-10px] right-[-10px] bg-slate-700 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm '>
            {cartTotalQty}
        </span>
    </div>
  )
}

export default CartCount
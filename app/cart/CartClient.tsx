'use client'
import { useCart } from "@/hooks/useCart"
import Link from "next/link";
import { MdArrowBack } from 'react-icons/md';
import HeadingDesign from "../components/HeadingDesign";
import ButtonDesign from "../components/ButtonDesign";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";
import React from "react";

interface CartClientProps {
    currentUser: SafeUser | null
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
    const router = useRouter();
    const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Your Cart is empty</div>
                <div>
                    <Link href="/" className="text-slate-500 flex items-center gap-1 mt-2" >
                        <MdArrowBack />
                        <span>Start Shopping</span>
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <div>
            <HeadingDesign title={"Shopping Cart"} center />
            <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
                <div className="col-span-2 justify-self-start">Product</div>
                <div className="justify-self-center">Price</div>
                <div className="justify-self-center">Quantity</div>
                <div className="justify-self-center">Total</div>
            </div>
            <div>
                {cartProducts && cartProducts.map((item) => {
                    return <ItemContent key={item.id} item={item} />
                })}
            </div>
            <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
                <div className="w-[90px]">
                    <ButtonDesign label="Clear Cart" onClick={() => { handleClearCart() }} small outline />
                </div>
                <div className="text-sm flex flex-col gap-1 items-start">
                    <div>
                        <div className="flex justify-between w-full text-base font-semibold">
                            <span>SubTotal</span>
                            <span>{formatPrice(cartTotalAmount)}</span>
                        </div>
                        <p className="text-slate-500 p-2">Taxes and Shipping created at Checkout</p>
                        <ButtonDesign
                            label={currentUser ? 'Checkout' : 'Login To Checkout'}
                            outline={currentUser ? false : true}
                            onClick={() => { currentUser ? router.push('/checkout') : router.push('/login') }} />
                        <Link href="/" className="text-slate-500 flex items-center gap-1 mt-2" >
                            <MdArrowBack />
                            <span>Continue Shopping</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartClient
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

type CartContextType = {
    cartTotalQty: number,
    cartProducts: CartProductType[] | null,
    handleAddProductToCart: (product: CartProductType) => void
}

interface Props{
    [propName: string]: any
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = (props: Props) => {

    const [cartTotalQty, setcartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null >(null);

    useEffect(()=>{
        const cartItems: any = localStorage.getItem("eShopCartItems");
        const productsInCart: CartProductType[] | null = JSON.parse(cartItems);
        setCartProducts(productsInCart);
    }, [])

    const handleAddProductToCart = useCallback((product: CartProductType)=>{
        setCartProducts((prev)=>{
            let updateCart;
            if(prev){
                updateCart = [...prev, product];
            }else{
                updateCart = [product]
            }
            toast.success("Your product ha been added to Cart!")
            localStorage.setItem("eShopCartItems", JSON.stringify(updateCart));
            return updateCart;
        });
    }, [])

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart
    }

    return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
    const context = useContext(CartContext);
    
    if(context === null ){
        throw new Error("useCart must be used within a CartContextProvider");
    }
    return context;
} 
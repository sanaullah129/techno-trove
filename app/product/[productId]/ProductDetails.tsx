"use client";

import ButtonDesign from "@/app/components/ButtonDesign";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";

interface ProductDetailsProps {
    product: any
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImage: SelectedImageType,
    quantity: number,
    price: number
}

export type SelectedImageType = {
    color: string,
    colorCode: string,
    image: string
}

const HorizontalLine = () => {
    return <hr className="w-[50%] my-2 border-t border-solid border-[1.2px] border-slate-300" />
}

const DescriptionHorizontalLine = () => {
    return <hr className="w-[95%] my-4 border-t border-solid border-[1.2px] border-blue-950" />
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const { handleAddProductToCart, cartProducts } = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);
    const router = useRouter();

    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImage: { ...product.images[0] },
        quantity: 1,
        price: product.price
    });

    const productRating = product.review.reduce((acc: number, item: any) =>
        item.rating + acc, 0) / product.review.length;

    const handleColorSelect = useCallback((value: SelectedImageType) => {
        setCartProduct((prev) => {
            return { ...prev, selectedImage: value }
        })
    }, [cartProduct.selectedImage])

    const handleQtyDecrease = useCallback(() => {
        if (cartProduct.quantity > 1) {
            setCartProduct((prev) => {
                return { ...prev, quantity: prev.quantity - 1 }
            })
        }
    }, [cartProduct]);

    const handleQtyIncrease = useCallback(() => {
        if (cartProduct.quantity <= 99) {
            setCartProduct((prev) => {
                return { ...prev, quantity: prev.quantity + 1 }
            })
        }
    }, [cartProduct]);

    useEffect(() => {
        setIsProductInCart(false);
        if (cartProducts) {
            const existingIndex = cartProducts.findIndex((item) => {return item.id === product.id;});
            if (existingIndex > -1) {
                setIsProductInCart(true);
            }
        }
    }, [cartProducts]);
    
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* <div>Images</div> */}
                <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect} />
                <div className="flex flex-col gap-1 text-slate-700">
                    <h2 className="text-3xl font-semibold text-slate-700">{product.name}</h2>
                    <HorizontalLine />
                    <div className="flex items-center gap-2">
                        <Rating value={productRating} readOnly />
                        <div>{product.review.length} reviews</div>
                    </div>
                    <HorizontalLine />
                    <div>
                        <span className="font-semibold">Category: </span> {product.category}
                    </div>
                    <HorizontalLine />
                    <div>
                        <span className="font-semibold">Brand: </span> {product.brand}
                    </div>
                    <div className={product.inStock ? "text-teal-400" : "text-rose-500"} >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                    </div>
                    <HorizontalLine />
                    {isProductInCart ? (
                        <>
                            <p className="mb-2 text-slate-500 flex items-center gap-1">
                                <IoMdCheckmarkCircle className="text-teal-400" size={20} />
                                <span>Product Added to Cart Successfully!!</span>
                            </p>
                            <div className="max-w-[300px]">
                            <ButtonDesign label="View Cart" outline onClick={()=>{
                                router.push("/cart");
                            }} ></ButtonDesign>
                            </div>                            
                        </>
                    ) : (
                        <>
                            <SetColor images={product.images} cartProduct={cartProduct} handleColorSelect={handleColorSelect} />
                            <HorizontalLine />
                            <SetQuantity cartProduct={cartProduct} handleQtyDecrease={handleQtyDecrease} handleQtyIncrease={handleQtyIncrease} />
                            <HorizontalLine />
                            <div className="max-w-[300px]">
                                <ButtonDesign label="Add to Cart" onClick={() => handleAddProductToCart(cartProduct)} />
                            </div>

                        </>)}

                </div>
            </div>
            <DescriptionHorizontalLine />
            <div className="text-justify">
                {product.description}
            </div>
        </>
    )
}

export default ProductDetails
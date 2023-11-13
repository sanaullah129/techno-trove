"use client";

import { Rating } from "@mui/material";

interface ProductDetailsProps {
    product: any
}

const HorizontalLine = () => {
    return <hr className="w-[50%] my-2 border-t border-solid border-[1.2px] border-blue-950" />
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {

    const productRating = product.reviews.reduce((acc: number, item: any) =>
        item.rating + acc, 0) / product.reviews.length

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>Images</div>
                <div className="flex flex-col gap-1 text-slate-700">
                    <h2 className="text-3xl font-semibold text-slate-700">{product.name}</h2>
                    <HorizontalLine />

                    <div className="flex items-center gap-2">
                        <Rating value={productRating} readOnly />
                        <div>{product.reviews.length} reviews</div>
                    </div>

                </div>
            </div>
            <HorizontalLine />
            <div className="text-justify">
                {product.description}
            </div>
        </>
    )
}

export default ProductDetails
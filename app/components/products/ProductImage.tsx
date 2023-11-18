'use client';
import { CartProductType, SelectedImageType } from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";
import React from "react";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImageType) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({ cartProduct, product, handleColorSelect }) => {
  return (
    <div className=" grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px] ">
      <div className=" flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        {product.images.map((image: SelectedImageType) => (
          <div
            key={image.color}
            onClick={() => handleColorSelect(image)}
            className={`relative w-80% aspect-square rounded border-teal-300 ${cartProduct.selectedImage.color === image.color ? "border-[2.5px]" : "border-none"}`}
          >
            <Image src={image.image} alt={image.color} height={50} width={50} className="object-contain" />
          </div>
        ))}
      </div>
      <div className=" col-span-5 relative aspect-square ">
        <Image className=" w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px] " src={cartProduct.selectedImage.image} alt={cartProduct.name} fill />
      </div>
    </div>
  );
};

export default ProductImage;
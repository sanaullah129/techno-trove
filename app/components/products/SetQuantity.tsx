'use client'

import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { product } from "@/utils/product";

interface SetQuantityProps {
    cartCounter?: boolean;
    cartProduct: CartProductType;
    handleQtyIncrease: () => void;
    handleQtyDecrease: () => void;
}

const btnStyles = 'border-[1.2px] border-slate-300 px-2 rounded'

const SetQuantity: React.FC<SetQuantityProps> = ({
    cartCounter,
    cartProduct,
    handleQtyIncrease,
    handleQtyDecrease
}) => {
    return (
        <div className="flex gap-8 items-center">
            {cartCounter ? null : <div className="font-semibold">Quantity: </div>}
            <div className="flex gap-4 items-center">
                <button className={btnStyles} onClick={handleQtyDecrease}>-</button>
                <div>{cartProduct.quantity}</div>
                <button className={btnStyles} onClick={handleQtyIncrease}>+</button>
            </div>
        </div>
    )
}

export default SetQuantity
'use client';
import AvatarDesign from "@/app/components/AvatarDesign";
import HeadingDesign from "@/app/components/HeadingDesign";
import { Rating } from "@mui/material";
import moment from "moment";
import React from "react";

interface ListRatingProps {
    product: any
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {

    if(product.review.length === 0 ) return null;

    return (
        <div>
            <HeadingDesign title="Product Reviews" />
            <div className="text-sm mt-2">
                {product.review && product.review.map((review: any) => {
                    return (
                        <div key={review.id} className="max-w-[300px]">
                            <div className="flex gap-2 items-center">
                                <AvatarDesign src={review?.user.image} />
                                <div className="font-semibold">{review?.user.name}</div>
                                <div className="font-light">{moment(review.createdDate).fromNow()}</div>
                            </div>
                            <div className="mt-2"><Rating value={review.rating} readOnly /></div>
                            <div className="ml-2">{review.comment}</div>
                            <hr className="mt-4 mb-4" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ListRating
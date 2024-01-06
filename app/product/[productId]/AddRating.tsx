'use client'

import ButtonDesign from '@/app/components/ButtonDesign';
import HeadingDesign from '@/app/components/HeadingDesign';
import InputDesign from '@/app/components/inputFields/InputDesign';
import { SafeUser } from '@/types';
import { Rating } from '@mui/material';
import { Product, Review, Order } from '@prisma/client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface AddRatingProps {
    product: Product & { review: Review[] };
    user: (SafeUser & { orders: Order[] }) | null;
};

const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: { comment: '', rating: 0 }
    });

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, { shouldTouch: true, shouldDirty: true, shouldValidate: true });
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        if (data.rating === 0) {
            setIsLoading(false);
            return toast.error('No Rating Selected');
        }
        const ratingData = { ...data, userId: user?.id, product: product };

        axios.post('/api/rating', ratingData).then(() => {
            toast.success('Rating Added Successfully');
            router.refresh();
            reset();
        }).catch((error) => {
            toast.error('Something went wrong');
        }).finally(() => {
            setIsLoading(false);
        });
    };

    if (!user || !product) return null;

    const deliveredOrder = user?.orders.some(order => order.products.find(item => item.id === product.id)
        && order.deliveryStatus === 'delivered');
//@ts-ignore
    const userReview = product?.review.find(((review: Review[]) => { return review.userId === user.id;}));
    if(userReview || !deliveredOrder) return null;

    return (
        <div className='flex flex-col gap-2 max-w-[500px]'>
            <HeadingDesign title='Rate this Product' />
            <Rating onChange={(event, newValue) => {
                setCustomValue('rating', newValue);
            }} />
            <InputDesign
                id='comment'
                label='Comment'
                disabled={isLoading}
                register={register}
                errors={errors} required />
            <ButtonDesign label={isLoading ? 'Loading' : 'Rate Product'} onClick={handleSubmit(onSubmit)} />
        </div>
    )
}

export default AddRating
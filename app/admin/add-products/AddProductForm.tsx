'use client'

import HeadingDesign from '@/app/components/HeadingDesign'
import CategoryInputDesign from '@/app/components/inputFields/CategoryInputDesign'
import CheckboxDesign from '@/app/components/inputFields/CheckboxDesign'
import InputDesign from '@/app/components/inputFields/InputDesign'
import TextAreaDesign from '@/app/components/inputFields/TextAreaDesign'
import { Categories } from '@/utils/categories'
import { colors } from '@/utils/colors'
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

export type ImageType = { color: string, colorCode: string, image: File | null }
export type UploadedImageType = { color: string, colorCode: string, image: string }

const AddProductForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            description: '',
            brand: '',
            category: '',
            inStock: false,
            images: [],
            price: ''
        }
    });

    const category = watch("category");
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
    };

    return (
        <>
            <HeadingDesign title='Add a Product' center />

            <InputDesign id='name' label='Name' disabled={isLoading} register={register} errors={errors} required />
            <InputDesign id='price' label='Price' disabled={isLoading} type='number' register={register} errors={errors} required />
            <InputDesign id='brand' label='Brand' disabled={isLoading} register={register} errors={errors} required />
            <TextAreaDesign id='description' label='Description' disabled={isLoading} register={register} errors={errors} required />
            <CheckboxDesign id='inStock' label='This product is in stock' register={register} />
            <div className='font-medium w-full'>
                <div className='mb-2 font-semibold'>Select a Category</div>
                <div className='grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto gap-3'>
                    {Categories.map((item)=>{
                        if(item.label === 'All'){
                            return null;
                        };
                        return (
                            <div key={item.label} className='col-span'>
                                <CategoryInputDesign 
                                    onClick={(category)=> setCustomValue('category', Categories)}
                                    selected={category === item.label}
                                    label={item.label}
                                    icon={item.icon} />
                            </div>
                        ) 
                    })}
                </div>
            </div>
            <div className='w-full flex flex-col flex-wrap gap-4'>
                <div>
                    <div className='font-bold'>Select the available product color and upload their images</div>
                    <div className='text-sm'>You must upload an image for each of the color selected otherwise your color selection will be ignored</div>
                </div>
                <div className='gird grid-cols-2 gap-3'>
                    {colors.map((color, index)=>{
                        return (
                            <div>
    
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default AddProductForm
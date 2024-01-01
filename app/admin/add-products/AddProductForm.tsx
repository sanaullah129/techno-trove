'use client';

import ButtonDesign from '@/app/components/ButtonDesign'
import HeadingDesign from '@/app/components/HeadingDesign'
import CategoryInputDesign from '@/app/components/inputFields/CategoryInputDesign'
import CheckboxDesign from '@/app/components/inputFields/CheckboxDesign'
import InputDesign from '@/app/components/inputFields/InputDesign'
import SelectColorDesign from '@/app/components/inputFields/SelectColorDesign'
import TextAreaDesign from '@/app/components/inputFields/TextAreaDesign'
import firebaseApp from '@/libs/firebase'
import { categories } from '@/utils/categories'
import { colors } from '@/utils/colors'
import React, { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export type ImageType = { color: string, colorCode: string, image: File | null }
export type UploadedImageType = { color: string, colorCode: string, image: string }

const AddProductForm = () => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [images, SetImages] = useState<ImageType[] | null>();
    const [isProductCreated, setIsProductCreated] = useState(false);

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

    useEffect(() => {
        setCustomValue('images', images);
    }, [images]);

    useEffect(() => {
        if (isProductCreated) { reset(); SetImages(null); setIsProductCreated(false); }
    }, [isProductCreated]);

    const category = watch("category");
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
    };

    const addImageToState = useCallback((value: ImageType) => {
        SetImages((prev) => {
            if (!prev) { return [value] };
            return [...prev, value];
        });
    }, []);

    const removeImageFromState = useCallback((value: ImageType) => {
        SetImages((prev) => {
            if (prev) {
                const filteredImages = prev.filter((item) => item.color !== value.color);
                return filteredImages
            };
            return prev;
        });
    }, []);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        //Upload the images to Firebase and save to database
        setIsLoading(true);

        let uploadedImages: UploadedImageType[] = [];
        if (!data.category) {
            setIsLoading(false);
            return toast.error("Please Select a Category");
        };
        if (!data.images || data.images.length === 0) {
            setIsLoading(false);
            return toast.error("No Image Selected!");
        };

        const handleImageUploads = async () => {
            toast('Creating product, please wait...');
            try {
                for (const item of data.images) {
                    if (item.image) {
                        const fileName = new Date().getTime() + '-' + item.image.name;
                        const storage = getStorage(firebaseApp);
                        const storageRef = ref(storage, `products/${fileName}`);
                        const uploadTask = uploadBytesResumable(storageRef, item.image);

                        await new Promise<void>((resolve, reject) => {
                            uploadTask.on('state_changed', (snapshot) => {
                                //snapshot to track the progress of uploading files
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                switch (snapshot.state) {
                                    case 'paused':
                                        break;
                                    case 'running':
                                        break;
                                }
                            }, (error) => {
                                reject(error);
                            }, () => {
                                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                    uploadedImages.push({ ...item, image: downloadURL })
                                    resolve();
                                }).catch((error) => {
                                    reject(error);
                                });
                            }
                            );
                        });
                    };
                };
            } catch (error) {
                setIsLoading(false);
                return toast.error("Error uploading Image");
            }
        };
        await handleImageUploads();
        const productData = { ...data, images: uploadedImages };
        axios.post('/api/product', productData).then(() => {
            toast.success("Product Added Successfully");
            setIsProductCreated(true);
            setTimeout(() => {
                router.refresh();
            }, 3000);
        }).catch((error) => {
            toast.error("Something went wrong. Please try again");
        }).finally(() => {
            setIsLoading(false);
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
                    {categories.map((item) => {
                        if (item.label === 'All') {
                            return null;
                        };
                        return (
                            <div key={item.label} className='col-span'>
                                <CategoryInputDesign
                                    onClick={(category) => setCustomValue('category', category)}
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
                <div className='grid grid-cols-2 gap-3'>
                    {colors.map((color, index) => {
                        return <SelectColorDesign key={index} item={color}
                            addImageToState={addImageToState} removeImageFromState={removeImageFromState} isProductCreate={isProductCreated} />
                    })}
                </div>
            </div>
            <ButtonDesign label={isLoading ? 'Loading...' : 'Add Product'} onClick={handleSubmit(onSubmit)} />
        </>
    )
}

export default AddProductForm
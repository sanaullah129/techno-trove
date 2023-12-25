'use client';
import { ImageType } from '@/app/admin/add-products/AddProductForm';
import React, { useCallback, useEffect, useState } from 'react'

interface SelectColorDesignProps{
    item: ImageType;
    addImageToState: (value: ImageType) => void;
    removeImageFromState: (value: ImageType) => void;
    isProductCreate: boolean
};

const SelectColorDesign:React.FC<SelectColorDesignProps> = ({ item, addImageToState, removeImageFromState, isProductCreate }) => {

    const [isSelected, SetIsSelected] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    useEffect(()=>{
        if(isProductCreate){
            SetIsSelected(false);
            setFile(null);
        };
    }, [isProductCreate]);

    const handleFileChange = useCallback((value: File)=>{
        setFile(value);
        addImageToState({...item, image: value});
    }, []);

    const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        SetIsSelected(e.target.checked);
        if(!e.target.checked){
            setFile(null);
            removeImageFromState(item);
        };
    }, []);

    return (
    <div className='items-center p-2 grid grid-cols-1 md:grid-cols-1 
        overflow-y-auto border-b-[1.2px] border-slate-300'>
        <div className='flex flex-row items-center gap-2 h-[60px]'>
            <input id={item.color} type='checkbox' checked={isSelected} onChange={handleCheck} className='cursor-pointer' />
        </div>
    </div>
  )
}

export default SelectColorDesign
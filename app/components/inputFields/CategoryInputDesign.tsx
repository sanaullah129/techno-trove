'use client';
import React from 'react'
import { IconType } from 'react-icons';

interface CategoryInputDesignProps{
    selected?: boolean;
    label: string;
    icon: IconType;
    onClick: (value: string) => void
}

const CategoryInputDesign:React.FC<CategoryInputDesignProps> = ({ selected, label, icon: Icon, onClick }) => {
  return (
    <div onClick={()=> onClick(label)} 
        className={`rounded-xl border-2 p-4 gap-2
            flex flex-col items-center 
            hover:border-slate-500 ${selected ? 'border-slate-500' : 'border-x-slate-200'}`} >
        <Icon size={30} />
        <div className='font-medium'>{label}</div>
    </div>
  )
}

export default CategoryInputDesign
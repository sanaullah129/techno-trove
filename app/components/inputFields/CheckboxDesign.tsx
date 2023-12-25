'use client';
import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface CheckboxDesignProps {
    id: string,
    label: string,
    disabled?: boolean,
    register: UseFormRegister<FieldValues>
};

const CheckboxDesign: React.FC<CheckboxDesignProps> = ({ id, label, disabled, register }) => {
    return (
        <div className='w-full flex flex-row gap-2 items-center'>
            <input type='checkbox'
                id={id}
                disabled={disabled}
                {...register(id)}
                placeholder=""
                className='cursor-pointer'
            />
            <label htmlFor={id} className='font-medium cursor-pointer' >{label}</label>
        </div>
    )
}

export default CheckboxDesign
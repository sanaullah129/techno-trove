'use client'

import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

const SearchBar = () => {

    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            searchTerm: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!data.searchTerm) return router.push('/');

        const url = queryString.stringifyUrl({
            url: '/',
            query: {
                searchTerm: data.searchTerm
            }
        }, { skipNull: true })
        router.push(url);
        reset();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == "Enter") { handleSubmit(onSubmit)() };
    }

    return (
        <div className='flex flex-center'>
            <input
                {...register('searchTerm')}
                autoComplete='off'
                type='text'
                placeholder='Explore Techno Trove'
                className='p-2 border-gray-300 rounded-l-md focus:outline-none focus:border-[0.5px] focus:border-slate-500 w-80'
                onKeyDown={handleKeyDown} />
            <button onClick={handleSubmit(onSubmit)} className='bg-slate-700 hover:opacity-75 text-white p-2 rounded-r-md'>Search</button>
        </div>
    )
}

export default SearchBar
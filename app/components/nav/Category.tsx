'use client';
import { useSearchParams } from 'next/dist/client/components/navigation';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import React, { useCallback } from 'react'
import { IconType } from 'react-icons';

interface CategoryProps {
    label: string;
    icon: IconType;
    selected?: boolean;
};

const Category: React.FC<CategoryProps> = ({ label, icon: Icon, selected }) => {

    const router = useRouter();
    const params = useSearchParams();
    
    const handleClick = useCallback(() => {
        if(label === 'All'){ router.push('/') }
        else{
            let currentQuery = {};
            if(params){
                currentQuery = qs.parse(params.toString());
            };
            const updateQuery: any = { ...currentQuery, category: label };
            //constructing url
            const url = qs.stringifyUrl({ url: '/', query: updateQuery }, { skipNull: true });
            console.log(url);
            router.push(url);
        }
    }, [label, params, router]);

    return (
        <div onClick={handleClick} className={`flex items-center justify-between text-center 
        gap-1 p-2 border-b-2 
        hover:text-slate-800 transition cursor-pointer 
        ${selected ? 'border-b-slate-800 text-slate-800' :
                'border-transparent text-slate-500'}`}>
            <Icon size={20} />
            <div className='font-medium text-sm'>{label}</div>
        </div>
    )
}

export default Category
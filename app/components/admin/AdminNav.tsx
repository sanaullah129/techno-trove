'use client';

import React from 'react'
import Container from '../Container'
import Link from 'next/link'
import AdminNavItems from './AdminNavItems'
import { MdDns, MdOutlineAddToPhotos, MdOutlineDashboard } from 'react-icons/md'
import { usePathname } from 'next/navigation'
import { FaList } from 'react-icons/fa';

const AdminNav = () => {

    const pathname = usePathname();

    return (
        <div className='w-full shadow-sm top-20 border-b-[1px] pt-4'>
            <Container>
                <div className='flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap'>
                    <Link href='/admin'>
                        <AdminNavItems icon={MdOutlineDashboard} label='Summary' selected={pathname === '/admin'} />
                    </Link>
                    <Link href='/admin/add-products'>
                        <AdminNavItems icon={MdOutlineAddToPhotos} label='Add Products' selected={pathname === '/admin/add-products'} />
                    </Link>
                    <Link href='/admin/manage-products'>
                        <AdminNavItems icon={MdDns} label='Manage Products' selected={pathname === '/admin/manage-products'} />
                    </Link>
                    <Link href='/admin/manage-orders'>
                        <AdminNavItems icon={FaList} label='Manage Orders' selected={pathname === '/admin/manage-orders'} />
                    </Link>
                </div>
            </Container>
        </div>
    )
}

export default AdminNav
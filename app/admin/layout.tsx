import React from 'react'
import AdminNav from '../components/admin/AdminNav';

export const metadata = {
    title: 'Techno-Trove Admin',
    description: 'Techno-Trove Admin Page Dashboard',
};

//for nested layour including children prop
const AdminLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <AdminNav />
        {children}
    </div>
  )
}

export default AdminLayout
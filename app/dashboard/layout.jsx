import SideBar from '@/Components/admin/sidebar'
import Navbar from '@/Components/admin/navbar'
import React from 'react'

export const metadata = {
    title: 'Admin Panel',
    description: 'The dashboard side of the system',
  }

export default function Layout({children}) {
  return (
    <div className="flex flex-row space-x-5">
        <SideBar/>
        <div className=''>
            <Navbar/>
            {children}
        </div>
        
    </div>
  )
}

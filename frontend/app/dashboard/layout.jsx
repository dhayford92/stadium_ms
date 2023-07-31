import SideBar from '@/Components/admin/sidebar'
import Navbar from '@/Components/admin/navbar'
import React from 'react'

export const metadata = {
    title: 'Admin Panel',
    description: 'The dashboard side of the system',
  }

export default function Layout({children}) {
  return (
    <div className="flex flex-row">
        <SideBar/>
        <div className='flex flex-col space-y-5 flex-1'>
            <Navbar/>
            {children}
        </div>
        
    </div>
  )
}

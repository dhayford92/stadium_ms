import Footer from '@/Components/client/footer'
import Navbar from '@/Components/client/navbar'
import React from 'react'



export default function Layout({ children }) {
  return (
    <div className='flex flex-col w-full h-full'>
        <Navbar/>
        {children}
        <Footer/>
    </div>
  )
}

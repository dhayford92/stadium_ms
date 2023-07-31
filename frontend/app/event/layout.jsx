import Footer from '@/Components/client/footer'
import Navbar from '@/Components/client/navbar'
import React from 'react'


export default function Layout({ children }) {
  return (
    <div className='flex flex-col justify-between w-full h-screen'>
        <Navbar/>
        {children}
        <Footer/>
    </div>
  )
}

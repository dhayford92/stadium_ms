import React from 'react'

export default function Footer() {
  return (
    <footer className='grid gap-10 bg-slate-200 w-full p-8 md:p-24 md:grid-flow-col md:grid-cols-4'>
        <div className='flex flex-col space-y-4 justify-start items-center md:items-start'>
          <h1 className='text-2xl font-bold'>
              Event
          </h1>
          <span className=''>
            Something here about the
            the system
          </span>
        </div>
        <div className='flex flex-col space-y-4 justify-start items-center md:items-start'>
          <h2 className='text-xl font-semibold'>Event Categories</h2>
          <div className='flex flex-col space-y-3 text-sm font-semibold text-gray-500 md:text-lg'>
            <span>Concert</span>
            <span>Sports</span>
          </div>
        </div>
        <div className='flex flex-col space-y-4 justify-start items-center md:items-start'>
          <h2 className='text-xl font-semibold'>About Us</h2>
          <div className='flex flex-col space-y-3 text-sm font-semibold text-gray-500 md:text-lg'>
            <span>Blog</span>
            <span>Privacy Policy</span>
          </div>
        </div>
        <div className='flex flex-col space-y-4 justify-start items-center md:items-start'>
          <h2 className='text-xl font-semibold'>Helpful Links</h2>
          <div className='flex flex-col space-y-3 text-sm font-semibold text-gray-500 md:text-lg'>
            <span>Parking Lot</span>
            <span>My Account</span>
            <span>Who are we?</span>
          </div>
        </div>
    </footer>
  )
}

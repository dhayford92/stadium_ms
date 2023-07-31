import ProfileNavBar from '@/Components/client/profile_navbar'
import React from 'react'

export default function Layout({children}) {
  return (
    <div className='p-3 w-full h-screen flex flex-col justify-center items-center space-y-5 md:flex-row space-x-10'>
        <ProfileNavBar/>
        {children}
    </div>
  )
}

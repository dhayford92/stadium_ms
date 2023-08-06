'use client'
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { BsFillPersonLinesFill, BsFilterLeft, BsCartDash } from "react-icons/bs";
import Image from 'next/image';

export default function Navbar() {
  const route = useRouter();
  const [isActive, setActive] = useState(0);

  const openProfile = () => {
    const token = localStorage.getItem('token');
    if(!token){
      alert('You are not logged in')
      return
    }
    route.push('/event/profile')
  }

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      setActive(1)
    }
  },[])

  return (
    <nav className='h-20 p-5 w-full flex justify-between items-center sticky top-0 z-20 bg-white'>
      {/* title */}
      <div className='flex flex-row space-x-3 md:space-x-0'>
        <BsFilterLeft size={40} className='md:hidden hover:transition ease-in duration-150 hover:text-slate-400 cursor-pointer'/>
        <Image src='/logo.png' alt='logo' width={140} height={50}/>
      </div>
        
        {/* menu list */}
        <div className='hidden md:block'>
          <ul className='flex space-x-10 text-sm font-semibold text-gray-800 md:text-lg'>
            <li className='hover:transition ease-in duration-150 hover:text-slate-400'><Link href='/event'> Home </Link></li>
            <li className='hover:transition ease-in duration-150 hover:text-slate-400'><Link href='/event/all'> All Event </Link></li>
            <li className='hover:transition ease-in duration-150 hover:text-slate-400'><Link href='/event/about'>About Us </Link></li>
          </ul>
        </div>

        <div className='hidden w-1/2 shadow-lg h-screen bg-slate-100'>
          {/* mobile nav  */}
        </div>
        
        {/* profile  */}
        <div className='flex flex-row space-x-2 md:space-x-4 justify-center items-center'>
          {isActive === 0 && 
              <Link href='/' className='hover:underline font-bold hover:transition ease-in duration-200 cursor-pointer'>Login</Link>}
          <div className='pr-3 pl-3 rounded-full border-2 hover:bg-slate-500 border-slate-700 text-center hover:text-cyan-700 hover:transition ease-in duration-200 cursor-pointer'>
            <BsFillPersonLinesFill onClick={()=>openProfile()} className='h-10'/>
          </div>
        </div>
        
    </nav>
  )
}

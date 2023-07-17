'use client'
import React , { useState } from 'react'
import { ticketData } from '@/data';

export default function EventDetail() {
    const [currentInde, setIndex] = useState(0);

    const changePage = (page)=> {
        setIndex((cur)=>{
            cur = page;
        })
    }
   
  return (
    <div className='w-full h-screen flex flex-col spce-y-5'>
        <div>
            
        </div>
    </div>
  )
}

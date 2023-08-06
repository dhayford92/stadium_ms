'use client'
import React from 'react'
import { useRouter } from 'next/navigation';


export default function ParkSlot() {
  const route = useRouter();
  const [parkData, setParkData] = React.useState([]);

  return (
    <div className='flex flex-col justify-between items-center space-y-4 p-5'>
        <h2 className="text-2xl font-bold mb-4 mt-4 items-right">
            Please Select Your Slot
        </h2>
        <div className='mt-4 flex flex-row items-center space-x-10'>
            <span className='text-xl text-gray-600'>Available</span>
            <span className='text-xl text-red-600'>Booked</span>
        </div>
        <div className='grid grid-cols-4 md:grid-cols-5 gap-5 text-white font-semibold'>
            {parkData.map((data, index)=>(
                <div key={index} 
                className={data.status === 'reserve'? 'p-4 rounded-lg bg-slate-500 text-center cursor-pointer hover:bg-slate-300 hover:transition ease-in-out duration-300 hover:text-slate-700': 
                'p-4 rounded-lg bg-red-500 text-center cursor-pointer'}>
                    {data.title}
                </div>
            ))}
        </div>
        <div className='flex flex-col md:flex-row space-y-4 md:space-x-3'>
            <label for='' className='font-bold text-md'>Enter Ticket ID:</label>
            <input type='text' 
            placeholder='Enter your ticket ID' 
            className='ring-1 ring-gray-200 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-slate-300'/>
        </div>
        <button onClick={()=>route.push('profile')}
        className='inline-block bg-slate-500 text-white text-xl font-semibold rounded-lg h-10 px-6 py-2 uppercase'>
            Reserve Parking Space
        </button>
    </div>
  )
}

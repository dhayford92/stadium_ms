'use client'
import React , { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function EventDetail() {
    const route = useRouter();
    const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const bookingData = {
    image: '/login.png',
    title: 'Event Name',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 'GH₵ 50',
    date: 'June 30, 2023',
    location: 'Event Venue, City',
  };
   
  return (
    <div className='w-full flex flex-col spce-y-5'>
        <div className='hidden md:block relative w-full h-[200px]'>
            <div className='h-[200px] bg-cover object-cover bg-no-repeat bg-center' style={{backgroundImage: `url('/category.png')`,}}>
                <div className="absolute inset-0 bg-black bg-opacity-50"/>
                <div className='relative z-10 flex flex-col justify-center items-center h-[200px]'>
                    <h1 className='font-bold text-4xl text-white text-center uppercase'>Detail Page</h1>
                </div>
            </div>
        </div>
        <div className="flex flex-wrap md:p-10">
            <div className="w-full md:w-1/2">
            <img
                src={bookingData.image}
                alt={bookingData.title}
                className="object-cover w-full h-auto"
            />
            </div>
            <div className="w-full md:w-1/2 py-4 md:py-0 pl-8 pr-8 md:pr-0">
            <h2 className="text-2xl font-bold mb-4">{bookingData.title}</h2>
            <p className="text-gray-600 mb-4">{bookingData.description}</p>
            <p className="text-gray-600">
                Price: <span className="font-semibold">{bookingData.price}</span>
            </p>
            <p className="text-gray-600">
                Date: <span className="font-semibold">{bookingData.date}</span>
            </p>
            <p className="text-gray-600">
                Location: <span className="font-semibold">{bookingData.location}</span>
            </p>
            <div className="mt-4 flex space-x-5">
                <label htmlFor="quantity" className="text-gray-600 font-semibold mb-2">
                    Quantity:
                </label>
                <input type="number" id="quantity" min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                className="w-24 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"/>
            </div>
            <button onClick={()=>route.push('cart')} className="mt-5 mb-5 button">
                Book Now
            </button>
            </div>
      </div>
        
    </div>
  )
}

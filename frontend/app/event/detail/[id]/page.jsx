'use client'
import React , { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { AddtoCart, GetEvent } from '@/Utils/ClientServer/event_server';
import Image from 'next/image';

export default function EventDetail({params}) {
    const route = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [bookingData, setBookingData] = useState({});

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

//   const addtoCart = () => {
//     const cart = localStorage.getItem('cart');
//     if(!cart){
//         localStorage.setItem('cart', JSON.stringify([{id: params.id, quantity: quantity, title: bookingData.title, image: bookingData.image}]))
//     }else{
//         const cartData = JSON.parse(cart);
//         const index = cartData.findIndex((item)=> item.id === params.id);
//         if(index === -1){
//             cartData.push({id: params.id, quantity: quantity})
//             localStorage.setItem('cart', JSON.stringify(cartData))
//         }else{
//             cartData[index].quantity = quantity;
//             localStorage.setItem('cart', JSON.stringify(cartData))
//         }
//     }
//     route.push('/event/cart')
//   };

  const addtoCart = () => {
        const body = {quantity: quantity}
        const token = localStorage.getItem('token');
        if(!token){
            alert('You are not logged in')
            route.push('/') 
        }

        AddtoCart(token, params.id, body).then((data)=>{
            alert(data['message'])
            route.push(`/event/checkout/${params.id}`)
        }).catch((error)=>{
            alert(error)
        });
  }

  useEffect(() => {
    GetEvent(params.id).then((data)=>{
        if(data['message'] || data['detail']){
            alert(data['message'] || data['detail'])
        }else{
            setBookingData(data)
        }
    }).catch((error)=>{
        alert(error)
    });
  }, []);
   
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
            <div className="relative w-full md:w-1/2 h-300 overflow-hidden">
                <Image
                    src={bookingData.image}
                    alt={bookingData.title}
                    fill={true}
                    className="absolute inset-0 w-full h-full object-contain object-center"
                />
            </div>
            <div className="w-full md:w-1/2 py-4 md:py-0 pl-8 pr-8 md:pr-0">
            <h2 className="text-2xl font-bold mb-4">{bookingData.title}</h2>
            <h2 className="text-xl text-gray-600  font-bold mb-4">Category: {bookingData.event_type}</h2>
            <p className="text-gray-600 mb-4">{bookingData.description}</p>
            <p className="text-gray-600">
                Price: Ghc <span className="font-semibold">{bookingData.price}</span>
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
            <button onClick={()=>addtoCart()} className="mt-5 mb-5 button">
                Book Now
            </button>
            </div>
      </div>
        
    </div>
  )
}

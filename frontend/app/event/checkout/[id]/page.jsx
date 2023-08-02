'use client'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import { GetCart } from '@/Utils/ClientServer/event_server';
import Image from 'next/image';



export default function CheckOut({params}) {
    const route = useRouter();

    const [cart, setCart] = useState({
        event: {},
        quantity: 0,
        total: 0,
    });

    const submitPayment = (e)=> {
        e.preventDefault();
        route.push('success')
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            alert('You are not logged in')
            route.push('/')
        }

        GetCart(token, params.id).then((data)=>{
            if(data['message'] || data['detail']){
                alert(data['message'] || data['detail'])
                route.push('/event')
            }else{
                console.log(data)
                setCart(data)
            }
        }).catch((error)=>{
            alert(error)
            route.push('/event')
        });
    }, []);
        
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        {cart && <div className="flex flex-col md:flex-row m-5">
            <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                <form className="space-y-4" onSubmit={(e)=> submitPayment(e)}>
                    <div>
                        <label htmlFor="address" className="block text-gray-600 font-semibold mb-1">
                            Address
                        </label>
                        <input type="text" id="address" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"/>
                    </div>
                    <div>
                    <label htmlFor="card" className="block text-gray-600 font-semibold mb-1">
                        Card Number
                    </label>
                    <input type="text" id="card" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"/>
                    </div>
                    <div className="flex Md:space-x-2 justify-between">
                    <div>
                        <label htmlFor="expiry" className="block text-gray-600 font-semibold mb-1">
                            Expiry Date
                        </label>
                        <input type="text" id="expiry"
                          className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="cvv" className="block text-gray-600 font-semibold mb-1">
                            CVV
                        </label>
                        <input type="text" id="cvv" className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"/>
                    </div>
                    </div>
                    <button type="submit" className="button">
                        Place Order
                    </button>
                </form>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 md:ml-8">
                <div className="bg-white rounded-md shadow-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                    <div className="flex flex-col space-y-5 items-center justify-start mb-2">
                        <div className='mb-3 w-full h-[100px] relative overflow-hidden p-1'>
                            <Image alt={cart.event['title']} className='absolute object-contain object-center' src={cart.event['image']} fill={true}/>
                        </div>
                        <span className='text-2xl font-semibold'>{cart.event['title']}</span>
                        <span className='text-sm'>Quantity: {cart.quantity}</span>
                        <span>GH₵{cart.event['price']}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex items-center justify-between">
                        <span>Total</span>
                        <span>GH₵{cart.total}</span>
                    </div>
                </div>
            </div>
            {/* <div className="md:w-1/2 mt-8 md:mt-0 md:ml-8">
                <div className="bg-white rounded-md shadow-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                    <div className="flex items-center justify-between mb-2">
                        <span>Product 1</span>
                        <span>GH₵10</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex items-center justify-between">
                        <span>Total</span>
                        <span>GH₵25</span>
                    </div>
                </div>
            </div> */}
      </div>}

    </div>
  )
}

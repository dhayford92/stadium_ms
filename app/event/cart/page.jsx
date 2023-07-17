'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { BsFillXCircleFill } from "react-icons/bs";

export const metadata = {
    title: 'Event | Cart',
    description: 'This is about the cart page of the user',
  }

export default function Cart() {
    const route = useRouter();

    const [cartItems, setCartItems] = useState([
        {
          id: 1,
          image: '/login.png',
          title: 'Product 1',
          price: 10,
          quantity: 2,
        },
        {
          id: 2,
          image: '/category.png',
          title: 'Product 2',
          price: 15,
          quantity: 1,
        },
    ]);
    

    const handleQuantityChange = (itemId, event) => {
        const newQuantity = parseInt(event.target.value);
        // Update the quantity for the corresponding item in the cart
        const updatedCartItems = cartItems.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              quantity: newQuantity,
            };
          }
          return item;
        });
        // Update the cart items
        setCartItems(updatedCartItems);
    };
    
    const handleRemoveItem = (itemId) => {
        // Remove the item from the cart
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        // Update the cart items
        setCartItems(updatedCartItems);
    };
  return (
    <div className='w-full min-h-screen flex flex-col justify-start items-center space-y-5'>
        <h2 className="text-2xl font-bold mb-4 mt-4 items-right">
            Cart
        </h2>
        <div className='flex flex-col space-y-5 md:flex-row md:space-x-10'>
        {cartItems.length === 0 ? (
            <p className="text-gray-600 font-medium text-xl hover:text-black hover:transition ease-in-out duration-200">
                <Link href='/event/all'>
                    Your cart is empty. 
                    Get back to book for new ticket.
                </Link>
            </p>
        ) : (
        <div className="flex flex-col space-y-5">
            {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-md shadow-lg p-4 flex items-center space-x-4">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover"/>
                <div className='flex flex-row space-x-5 items-center'>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600">{item.price}</p>
                    <div className="flex items-center mt-2">
                    <label htmlFor={`quantity-${item.id}`} className="hidden md:block text-gray-600 font-semibold">
                        Qty:
                    </label>
                    <input
                        type="number"
                        id={`quantity-${item.id}`}
                        className="w-16 px-4 py-2 border border-gray-300 rounded-md focus:outline-none ml-2"
                        min="1"
                        value={item.quantity}
                        onChange={(event) => handleQuantityChange(item.id, event)}/>
                    </div>
            </div>
            <BsFillXCircleFill size={30} className="hover:bg-red-600 text-white font-semibold py-2 rounded ml-auto bg-red-400 cursor-pointer"
                onClick={() => handleRemoveItem(item.id)}/>
            </div>
            ))}
        </div>
        )}
        {cartItems.length > 0 && (
        <div className="mt-8">
            <p className="text-gray-600 text-right font-semibold text-xl">
                Total: GH₵{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
            </p>
            <button onClick={()=>route.push('checkout')}  className="button mt-4 p-8">
                Checkout
            </button>
        </div>
        )}
        </div>
        
    </div> 
  )
}

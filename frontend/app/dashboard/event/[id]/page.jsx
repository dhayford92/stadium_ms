'use client'
import React, {useEffect, useState} from 'react'
import { FaChevronCircleLeft } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { GetEvent } from '@/Utils/ClientServer/event_server';
import Image from 'next/image';

export default function EventDetailPage({params}) {
    const route = useRouter();
    const [event, setEvent] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            alert('You are not logged in')
            route.push('/')
        }
        GetEvent(token, params.id).then((data)=>{
            if(data['message'] || data['detail']){
                alert(data['message'] || data['detail'])
            }else{
                setEvent(data)
            }
        }).catch((error)=>{
            alert(error)
        });
    }, []);

  return (
    <div className='h-full overflow-y-auto'>
        <div className="container px-6 mx-auto grid">
            <div className='flex space-x-5 items-center mb-5'>
                <div onClick={()=>route.back()}>
                    <FaChevronCircleLeft size={20} className='inline-block text-2xl cursor-pointer'/>
                </div>
                <h2 className="ml-3 text-2xl font-bold">
                    {event.title}
                </h2>
            </div>
            <hr className="my-4"/>
            <div className="flex flex-col md:flex-row md:space-x-5 space-y-4">
                <div className='flex-1 flex-col space-y-4'>
                    <div>
                        <label htmlFor="title" className="block text-gray-600 font-semibold mb-1">
                            Title
                        </label>
                        <input type="text" id="title" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none" value={event.title} disabled/>
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-gray-600 font-semibold mb-1">
                            Price
                        </label>
                        <input type="number" id="price" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none" value={event.price} disabled/>
                        <p className='text-gray-400 text-sm'>*Price per ticket</p>
                        <p className='text-gray-400 text-sm'>*Price may vary</p>
                    </div>
                    <div>
                        <label htmlFor="capacity" className="block text-gray-600 font-semibold mb-1">
                            Capacity
                        </label>
                        <input type="number" id="capacity" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none" value={event.capacity} disabled/>
                    </div>
                    <div>
                        <label htmlFor="event_type" className="block text-gray-600 font-semibold mb-1">
                            Event Type
                        </label>
                        <select id="event_type" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none" disabled>
                            <option value={event.event_type}>{event.event_type}</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-gray-600 font-semibold mb-1">
                            Date
                        </label>
                        <input type="date" id="date" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none" value={event.date} disabled/>
                    </div>
                    <div>
                        <label htmlFor="time" className="block text-gray-600 font-semibold mb-1">
                            Time
                        </label>
                        <input type="time" id="time" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none" value={event.time} disabled/>
                    </div>
                </div>
                <div className='flex-1 flex-col space-y-4'>
                    <div>
                        <label htmlFor="location" className="block text-gray-600 font-semibold mb-1">
                            Location
                        </label>
                        <input type="text" id="location" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none" value={event.location} disabled/>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-gray-600 font-semibold mb-1">
                            Description
                        </label>
                        <textarea id="description" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none" value={event.description} disabled/>
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-gray-600 font-semibold mb-1">
                            Image
                        </label>
                        <div className='w-full h-60 relative'>
                            <Image src={event.image} layout='fill' objectFit='cover' className='rounded-md'/>
                            <div className="absolute inset-0 bg-black bg-opacity-50"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

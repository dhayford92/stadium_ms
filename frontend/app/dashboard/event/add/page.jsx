'use client'
import React from 'react'
import { FaChevronCircleLeft } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { CreateEvent } from '@/Utils/AdminServer/admin_events';

export default function CreateEventPage() {
  const route = useRouter();

  var form = new FormData();

  const submitForm = (e) => {
    e.preventDefault();
    form.append('title', e.target.title.value);
    form.append('price', e.target.price.value);
    form.append('location', e.target.location.value);
    form.append('capacity', e.target.capacity.value);
    form.append('event_type', e.target.event_type.value);
    form.append('date', e.target.date.value);
    form.append('time', e.target.time.value);
    form.append('image', e.target.image.files[0]);
    form.append('description', e.target.description.value);

    const token = localStorage.getItem('token');
  
    CreateEvent(token, form).then((data)=>{
      alert(data['message'] || data['detail'] || data['image'] || data['event_type'] || data['price'])
      if (data['message']) {
        route.push('/dashboard/event')
      }
    }).catch((error)=>{
      alert(error)
    });
  }

  return (
    <div className='h-full overflow-y-auto p-2'>
      <div className="container px-6 mx-auto grid">
        <div className='flex space-x-5 items-center mb-5'>
          <div onClick={()=>route.back()}>
            <FaChevronCircleLeft size={20} className='inline-block text-2xl cursor-pointer'/>
          </div>
          <h2 className="ml-3 text-2xl font-bold">
            Add New Event
          </h2>
        </div>
        
        <hr className="my-4"/>
        <form className="w-full space-y-4" onSubmit={(e)=>submitForm(e)}>
            <div className="flex flex-col md:flex-row md:space-x-5 space-y-4">
                {/* ---- first column ---- */}
                <div className='flex-1 flex-col space-y-4'>
                    <div>
                        <label htmlFor="title" className="block text-gray-600 font-semibold mb-1">
                            Title
                        </label>
                        <input type="text" id="title" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"/>
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-gray-600 font-semibold mb-1">
                            Price
                        </label>
                        <input type="number" id="price" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"/>
                    </div>
                    <div>
                        <label htmlFor="capacity" className="block text-gray-600 font-semibold mb-1">
                            Capacity
                        </label>
                        <input type="number" id="capacity" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"/>
                    </div>
                    <div>
                        <label htmlFor="event_type" className="block text-gray-600 font-semibold mb-1">
                            Event Type
                        </label>
                        <select id="event_type" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none">
                            <option value="Concert">Concert</option>
                            <option value="Sports">Sports</option>
                        </select>
                    </div>
                    <div className='flex space-x-5'>
                        <div className='flex-1'>
                            <label htmlFor="date" className="block text-gray-600 font-semibold mb-1">
                                Date
                            </label>
                            <input type="date" id="date" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"/>
                        </div>
                        <div className='flex1'>
                            <label htmlFor="time" className="block text-gray-600 font-semibold mb-1">
                                Time
                            </label>
                            <input type="time" id="time" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"/>
                        </div>
                    </div>
                </div>
                {/* ---- second column ---- */}
                <div className='flex-1'>
                    <div>
                        <label htmlFor="location" className="block text-gray-600 font-semibold mb-1">
                            Location
                        </label>
                        <input type="address" id="location" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"/>
                    </div>
                    <div>   
                        <label htmlFor="image" className="block text-gray-600 font-semibold mb-1">
                            Image
                        </label>
                        <input type="file" id="image" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"/>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-gray-600 font-semibold mb-1">
                            Description
                        </label>
                        <textarea id="description" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"/>
                    </div>
                </div>
            </div>
          <hr className="my-4"/>
            <div className="flex justify-end">
                <button type="submit" className="button pl-4 pr-4">
                    Add Event
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}

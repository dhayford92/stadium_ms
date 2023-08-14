'use client'
import Paginator from '@/Components/admin/paginator';
import Link from 'next/link';
import React, {useState, useEffect} from 'react'
import { BsSearch } from "react-icons/bs";
import { GetALLAdminEvents, DeleteEvent } from '@/Utils/AdminServer/admin_events';
import { useRouter } from 'next/navigation';


export default function Events() {
  const currentIndex = '1';
  const route = useRouter();
  const [data, setData] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
        alert('You are not logged in')
        route.push('/')
    }
    GetALLAdminEvents(token).then((data)=>{
        if(data['message'] || data['detail']){
            alert(data['message'] || data['detail'])
        }else{
            setData(data)
        }
    }).catch((error)=>{
        alert(error)
    });
  }, []);


  const deleteEvent = (id) => {
    const token = localStorage.getItem('token');

    DeleteEvent(token, id).then((data)=>{
        alert(data['message'])
        window.location.reload()
    }).catch((error)=>{
        alert(error)
    });
  }

  return (
    <main className='h-full overflow-y-auto'>
      <div className='container px-6 mx-auto grid'>
        <h2 className="my-6 text-2xl font-semibold text-gray-700">
          All Events
        </h2>
        {/* Search */}
        <div className="mt-5 flex items-center justify-between mb-6">
            <button onClick={()=> route.push('/dashboard/event/add')}
            className='px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-300 hover:text-slate-800 transition-colors ease-in-out duration-300'>
                Add New Event
            </button>
            <form>   
                <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative w-[500px]">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
                    <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
        </div>
          
         {/* Table of transactions */}
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Capacity</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {data.map((event, index)=>(
                  <tr key={index} className="text-gray-700">
                    <td className="px-4 py-3 text-sm">{event.id}</td>
                    <td className="px-4 py-3">
                      <h1 className="font-semibold">{event.title}</h1>
                    </td>
                    <td className="px-4 py-3 text-sm">
                        Ghc {event.price}
                    </td>
                    <td className="px-4 py-3 text-xs">
                        <span className=''>
                            {event.location}
                        </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                        {event.capacity}
                    </td>
                    <td className="px-4 py-3 text-sm">
                        {event.date} {event.time}
                    </td>
                    <td className="px-4 py-3 text-sm flex items-center">
                        <Link href={`event/`+event.id} className=' text-purple-500 hover:underline transition ease-in duration-300'>View</Link>
                        <div onClick={()=>deleteEvent(event.id)}>
                          <Link href='' className='ml-2 text-red-500 hover:underline transition ease-in duration-300'>Delete</Link>
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t bg-gray-50 sm:grid-cols-9">
            <span className="flex items-center col-span-3">
              Showing 21-30 of 100
            </span>
            <span className="col-span-2"></span>
            {/* Pagination */}
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul className="inline-flex items-center">
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Previous">
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20">
                        <path
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                  <li>
                   <Paginator value='1' currentIndex={currentIndex}/>
                  </li>
                  <li>
                   <Paginator value='2' currentIndex={currentIndex}/>
                  </li>
                  <li>
                   <Paginator value='3' currentIndex={currentIndex}/>
                  </li>
                 
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Next">
                      <svg
                        className="w-4 h-4 fill-current"
                        aria-hidden="true"
                        viewBox="0 0 20 20">
                        <path
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}

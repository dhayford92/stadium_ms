'use client'
import React, {useEffect, useState} from 'react'
import { BsSearch } from "react-icons/bs";
import Paginator from '@/Components/admin/paginator';
import Link from 'next/link';
import { get_park } from '@/Utils/AdminServer/park_server';
import { GetAllEvents } from '@/Utils/ClientServer/event_server';


export default function ParkPage() {
    const style = " px-2 py-1 font-semibold leading-tight rounded-full"
    const [data, setData] = useState([
        {
            id: 1,
            name: 'parking 1',
            is_booked: false,
            price: 10000
        },
    ]);
    const [event, setEvent] = useState([{id: 1, title: 'event 1'}]);
    const [search, setSearch] = useState(1);
    const [currentIndex, setPage] = useState('1');

    useEffect(() => {
        GetAllEvents().then((res) => {
            setEvent(res);
            
        }).catch((err) => {
            console.log(err);
        });
        get_park(search).then((res) => {
            setData(res);
            console.log(res);
        }
        ).catch((err) => {
            console.log(err);
        });
        
    }, [search]);

  return (
    <div className='h-full overflow-y-auto'>
        <div className="container px-6 mx-auto grid">
            <h2 className="my-6 text-2xl font-semibold text-gray-700">
                All Parking Space
            </h2>
            <hr className="my-4"/>
            <div className="mt-5 flex items-start md:items-center md:justify-between mb-6 flex-col space-y-4 md:flex-row">
                <button className='px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-300 hover:text-slate-800 transition-colors ease-in-out duration-300'>
                    Add New Parking Solt
                </button>
                <div className='relative w-full pl-5 md:pl-0 max-w-xl focus-within:text-slate-500'>
                    <BsSearch size={25} className='absolute inset-y-0 flex items-center pl-2 pt-2'/>
                    <input type='text' className='pt-1 pb-1 w-full h-fit pl-10 pr-2 text-md text-gray-700 placeholder-gray-600 bg-slate-200 border-0 rounded-md focus:placeholder-slate-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-sm focus:shadow-slate-300' placeholder='search for parking space'/>
                </div>
            </div>
            <hr className="my-4"/>
            <div className="w-full flex space-x-5  overflow-hidden rounded-lg shadow-xs">
                <div className="flex-2 overflow-y-auto">
                    <div className="flex flex-col space-y-3">
                        {event.map((event, index)=>(
                            <div key={index} onClick={()=>setSearch(()=>event.id)} className="flex items-center px-4 py-3 text-gray-700 bg-gray-100 rounded-md cursor-pointer">
                                <div className="w-4 h-4 rounded-full bg-purple-500 mr-3"></div>
                                <div className="flex-1">
                                    <h1 className="text-sm font-semibold">{event.title}</h1>
                                </div>
                            </div>
                        ))}
                    </div> 
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full whitespace-no-wrap">
                        <thead>
                            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">name</th>
                            {/* <th className="px-4 py-3">user</th> */}
                            <th className="px-4 py-3">price</th>
                            <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y">
                        {data.map((park, index)=>(
                        <tr key={index} className="text-gray-700">
                            <td className="px-4 py-3 text-sm">
                                {park.id}
                            </td>
                            <td className="px-4 py-3">
                            <h1 className="font-bold">{park.name}</h1>
                            </td>
                            {/* <td className="px-4 py-3">
                            <h1 className="font-semibold">{park.user}</h1>
                            </td> */}
                            <td className="px-4 py-3 text-sm">
                                Ghc {park.price}
                            </td>
                            <td className="px-4 py-3 text-xs">
                                <span className={park.is_booked?"text-green-700 bg-green-100"+style:"text-orange-700 bg-orange-100"+style}>
                                    {park.is_booked?"Booked":"Not Booked"}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-sm">
                                <Link href={`parking/`+park.id} className='text-purple-500 hover:underline transition ease-in duration-300'>View</Link>
                                <div className='ml-2 inline-block'>
                                <Link href='' className='text-red-500 hover:underline transition ease-in duration-300'>Delete</Link>
                                </div>
                            </td>
                        </tr>))}
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
        </div>
    </div>
  )
}

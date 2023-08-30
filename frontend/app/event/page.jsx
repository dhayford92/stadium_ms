'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BsSearch } from "react-icons/bs";
import Card from '@/Components/Card/card'
import { GetAllEvents } from '@/Utils/ClientServer/event_server';

export default function Event() {
    const route = useRouter();
    const [searchItem, setSearchItem] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([
        {
            id: 0,
            title: '',
            image: '',
            price: '',
            date: '',
        }
    ]);

    const setFilter = (e) => {
        e.preventDefault();
        setSearchItem(e.target.value)
    }

    
    
    useEffect(() => {
        GetAllEvents().then((data)=>{
            if(data['message'] || data['detail']){
                alert(data['message'] || data['detail'])
            }else{
                const sportTitle = 'sport'
                let sport = data.filter((ticket) => {
                    return ticket.event_type.toLowerCase().includes(sportTitle.toLowerCase())
                })
                setData(sport)
                const concertTitle = 'concert'
                let concert = data.filter((ticket) => {
                    return ticket.event_type.toLowerCase().includes(concertTitle.toLowerCase())
                })
                setFilteredData(concert)
            }
        }).catch((error)=>{
            alert(error)
        });
        
    }, []);

    

  return (
    <main className='container max-w-full'>
        <div className='flex flex-col'>
        <div className='relative w-full h-[600px]'>
                <div className='h-[600px] bg-cover object-cover bg-no-repeat bg-center' style={{backgroundImage: `url('/bg2.png')`,}}>
                    <div className="absolute inset-0 bg-black bg-opacity-50"/>
                    <div className='relative z-10 flex flex-col justify-center items-center h-[600px]'>
                        <div className='flex flex-col justify-center items-center text-white'>
                            <h1 className='font-bold text-4xl'>Let Us</h1>
                            <h1 className='font-semibold text-3xl'>Make Event Happen</h1>
                        </div>
                        <div className='w-full mt-3 p-2 md:p-0 flex flex-col justify-center items-center'>
                            <h3 className='mb-3 font-bold text-md text-white'>Shop millions of tickets at the stadium</h3>
                            <div className='relative w-full pl-5 md:pl-0 max-w-xl mr-6 focus-within:text-slate-500'>
                                <BsSearch size={30} className='absolute inset-y-0 flex items-center pl-2 pt-2'/>
                                <input type='text' onChange={(e)=>setFilter(e)} 
                                className='pt-2 pb-2 w-full h-fit pl-8 pr-2 text-md text-gray-700 placeholder-gray-600 bg-slate-200 border-0 rounded-md focus:placeholder-slate-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-sm focus:shadow-slate-300' placeholder='search for event'/>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className='w-full p-5 md:p-10'>
                <div className='mb-10 flex flex-col space-y-5'>
                    <div className='flex justify-between items-center'>
                        <h1 className='font-semibold text-xl'>Concerts</h1>
                        <span className='font-semibold text-sm'><Link href='/event/concert'>See More</Link></span>
                    </div>
                    {filteredData.length === 0 && <h1 className='text-center font-semibold text-xl'>No data found</h1>}
                    {filteredData.length && <div className="flex flex-row space-x-6 overflow-scroll overflow-x-auto overflow-y-hidden pb-5">
                        {filteredData.map((ticket, index) => (
                        <Card 
                            key={index}
                            index={index} 
                            title={ticket.title} 
                            image={ticket.image} 
                            price={ticket.price} 
                            date={ticket.date} 
                            route={`/event/detail/${ticket.id}`}
                        />
                        ))}
                    </div>}
                </div>
                <div className='mb-10 flex flex-col space-y-5'>
                    <div className='flex justify-between items-center'>
                        <h1 className='font-semibold text-xl'>Sports</h1>
                        <span className='font-semibold text-sm'><Link href='/event/sports'>See More</Link></span>
                    </div>
                    {data.length === 0 && <h1 className='text-center font-semibold text-xl'>No data found</h1>}
                    {data.length && <div className="flex flex-row space-x-6 overflow-scroll overflow-x-auto overflow-y-hidden pb-5">
                        {data.map((ticket, index) => (
                        <Card 
                            key={index}
                            index={index} 
                            title={ticket.title} 
                            image={ticket.image} 
                            price={ticket.price} 
                            date={ticket.date} 
                            route={`/event/detail/${ticket.id}`}
                        />
                        ))}
                    </div>}
                </div>
            </div>
        </div>
        {/* <div className='w-full p-5 md:p-24'>
            
        </div> */}
    </main>
  )
}

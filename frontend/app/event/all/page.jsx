'use client'
import React , { useState, useEffect } from 'react'
import { BsSearch } from "react-icons/bs";
import Card from '@/Components/Card/card'
import { GetAllEvents } from '@/Utils/ClientServer/event_server';
import { useRouter } from 'next/navigation';


export default function AllEvents() {
    const [selectedOption, setSelectedOption] = useState('');
    const [data, setData] = useState([]);
    const route = useRouter();

    useEffect(() => {
        GetAllEvents().then((data)=>{
            if(data['message'] || data['detail']){
                alert(data['message'] || data['detail'])
            }else{
                // let sport = data.filter((ticket) => {
                //     return ticket.event_type.toLowerCase().includes(selectedOption.toLowerCase())
                // })
                setData(data)
            }
        }).catch((error)=>{
            alert(error)
        });
    }, []);

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    
  return (
    <div className='w-full flex flex-col spce-y-5'>
        <div className='relative w-full h-[200px]'>
            <div className='h-[200px] bg-cover object-cover bg-no-repeat bg-center' style={{backgroundImage: `url('/allevents.png')`,}}>
                <div className="absolute inset-0 bg-black bg-opacity-50"/>
                <div className='relative z-10 flex flex-col justify-center items-center h-[200px]'>
                    <h1 className='font-bold text-4xl text-white text-center uppercase'>All Events</h1>
                </div>
            </div>
        </div>
        <div className='w-full p-5 flex flex-col space-y-5 justify-none items-center md:pr-20 md:pl-20 md:flex-row md:justify-between'>
            <div className='relative w-full pl-5 md:pl-0 max-w-xl mr-6 focus-within:text-slate-500'>
                <BsSearch size={30} className='absolute inset-y-0 flex items-center pl-2 pt-2'/>
                <input type='text' className='pt-2 pb-2 w-full h-fit pl-8 pr-2 text-md text-gray-700 placeholder-gray-600 bg-slate-200 border-0 rounded-md focus:placeholder-slate-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-sm focus:shadow-slate-300' placeholder='search for event'/>
            </div>
            <div className="relative focus-within:text-slate-500">
                <select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                    <option value="">All</option>
                    <option value="sport">Sport</option>
                    <option value="concert">Concert</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    >
                    <path
                        fillRule="evenodd"
                        d="M6.586 8l-3.293-3.293a1 1 0 0 1 1.414-1.414L8 6.586l3.293-3.293a1 1 0 0 1 1.414 1.414L9.414 8l3.293 3.293a1 1 0 1 1-1.414 1.414L8 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L6.586 8z"
                    />
                    </svg>
                </div>
            </div>
        </div>
        <div className="p-10 flex flex-wrap space-x-5 space-y-5 md:justify-center justify-start overflow-x-auto overflow-visible">
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
        </div>
    </div>
  )
}

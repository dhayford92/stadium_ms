'use client'
import React, {useEffect, useState} from 'react'
import Card from '@/Components/Card/card'
import { GetAllEvents } from '@/Utils/ClientServer/event_server';
import { useRouter } from 'next/navigation';

export default function EventCategory({ params }) {
    const route = useRouter();
    const [data, setData] = useState([]);

    useEffect(() => {
        GetAllEvents().then((data)=>{
            if(data['message'] || data['detail']){
                alert(data['message'] || data['detail'])
            }else{
                let sport = data.filter((ticket) => {
                    return ticket.event_type.toLowerCase().includes(params.category_name.toLowerCase())
                })
                setData(sport)
            }
        }).catch((error)=>{
            alert(error)
        });
        
    }, []);
   
  return (
    <div className='w-full flex flex-col spce-y-5'>
        <div className='relative w-full h-[200px]'>
            <div className='h-[200px] bg-cover object-cover bg-no-repeat bg-center' style={{backgroundImage: `url('/category.png')`,}}>
                <div className="absolute inset-0 bg-black bg-opacity-50"/>
                <div className='relative z-10 flex flex-col justify-center items-center h-[200px]'>
                    <h1 className='font-bold text-4xl text-white text-center uppercase'>{params.category_name}</h1>
                </div>
            </div>
        </div>
        <div className="p-5 flex flex-wrap space-x-5 space-y-5 md:justify-center justify-start overflow-x-auto overflow-visible">
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

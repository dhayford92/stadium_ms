'use client'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import { FaChevronCircleLeft } from "react-icons/fa";
import { GetDetailTicket } from '@/Utils/AdminServer/ticket_server';
import Image from 'next/image';

export default function TicketDetailPage({params}) {
    const [data, setData] = useState({
        id: 0,
        qr_code: '',
        event: {title: '', image: ''},
        ticket_id: '',
        user: {fullname: ''},
        total: 0,
        status: '',
        seat: '',
        quantity: 0,
        is_refund: false,
        is_valid: false
    })
    const route = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            alert('You are not logged in')
            route.push('/')
        }
        GetDetailTicket(token, params.id).then((data)=>{
            if(data['message'] || data['detail']){
                alert(data['message'] || data['detail'])
            }else{
                setData(data)
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
                    {data.event.title}
                </h2>
            </div>
            <hr className="my-4"/>
            <div className="flex flex-col md:flex-row md:space-x-5 space-y-4">
                <div className='relative w-full md:w-1/2 h-[400px] overflow-hidden'>
                    <Image src={data.event.image} alt="qr code" fill={true} className='absolute'/>
                </div>
                <div className='w-full md:w-1/2'>
                    <div className='shadow-lg rounded-md p-2 shadow-slate-200 grid grid-cols-2 gap-5'>
                        <div>
                            <Image src={data.qr_code} alt="qr code" width={200} height={160} className='rounded-md'/>
                        </div>
                        <div></div>
                        <div>
                            <h1 className='font-semibold'>User</h1>
                            <p>{data.user.fullname}</p>
                        </div>
                        <div>
                            <h1 className='font-semibold'>{data.ticket_id}</h1>
                            <p>{data.ticket_id}</p>
                        </div>
                        <div>
                            <h1 className='font-semibold'>Status</h1>
                            <p>{data.status}</p>
                        </div>
                        <div>
                            <h1 className='font-semibold'>Seat</h1>
                            <p>{data.seat}</p>
                        </div>
                        <div>
                            <h1 className='font-semibold'>Quantity</h1>
                            <p>{data.quantity}</p>
                        </div>
                        <div>
                            <h1 className='font-semibold'>Total</h1>
                            <p>Ghc {data.total}</p>
                        </div>
                        <div>
                            <h1 className='font-semibold'>Refund</h1>
                            <p>{data.is_refund?'Yes':'No'}</p>
                        </div>
                        <div>
                            <h1 className='font-semibold'>Valid</h1>
                            <p>{data.is_valid?'Yes':'No'}</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-4"/>
            <div className='flex flex-col md:flex-row md:space-x-5 space-y-4'>
                <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md md:w-[200px]'>Refund</button>
                <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md md:w-[200px]'>Verify</button>
            </div>
        </div>
    </div>
  )
}

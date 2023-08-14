'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { GetParkingLot, UpdateParkingLot} from '@/Utils/ClientServer/event_server';


export default function ParkSlot({params}) {
  const route = useRouter();
  const [parkData, setParkData] = React.useState([
    {name: 'A1', is_booked: false},
  ]);

  const [ticket, setTicket] = React.useState(0);

  const submitTicket = (e)=>{
        e.preventDefault();
        const token = localStorage.getItem('token');
        var parking_lot_id = e.target[0].value
        if (parking_lot_id == '') {
            alert('Please enter your ticket ID')
            return
        }
        const data = {
            parking_lot_id: ticket
        }
        ticket == 0 && alert('Please select your parking lot')
        if(ticket == 0) return
        UpdateParkingLot(token, parking_lot_id, data).then((res)=>{
            if (res['message']){
                alert(res['message'])
                route.push('/event/profile')
            }else{
                alert(res['error'])
            }
            
        })

    }


    React.useEffect(()=>{
        const token = localStorage.getItem('token');
        GetParkingLot(token, params.id).then((res)=>{
            setParkData(res)
        }
        )
    }, [])

  return (
    <div className='flex flex-col justify-between items-center space-y-4 p-5'>
        <h2 className="text-2xl font-bold mb-4 mt-4 items-right">
            Please Select Your Slot
        </h2>
        <div className='mt-4 flex flex-row items-center space-x-10'>
            <span className='text-xl text-gray-600'>Available</span>
            <span className='text-xl text-red-600'>Booked</span>
        </div>
        <div className='grid grid-cols-4 md:grid-cols-5 gap-5 text-white font-semibold'>
            {parkData.map((data, index)=>(
                <div key={index} onClick={()=> data.is_booked == false && setTicket(()=>data.id)}
                    className={data.is_booked == false?'p-4 rounded-lg bg-slate-500 text-center cursor-pointer hover:bg-slate-300 hover:transition ease-in-out duration-300 hover:text-slate-700': 
                'p-4 rounded-lg bg-red-500 text-center cursor-pointer'}>
                    {data.name}
                </div>
            ))}
        </div>
        <form onSubmit={(e)=>submitTicket(e)}>
            <div className='flex flex-col md:flex-row space-y-4 md:space-x-3'>
                <label className='font-bold text-md'>Enter Ticket ID:</label>
                <input type='text' placeholder='Enter your ticket ID' className='ring-1 ring-gray-200 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-slate-300 bg-white'/>
            </div>
            <button type='submit' className='mt-3 button'>
                    Reserve Parking Space
            </button>
        </form>
        
    </div>
  )
}

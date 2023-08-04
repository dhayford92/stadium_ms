'use client'
import Link from 'next/link';
import React, {useState} from 'react'
import { FaTachometerAlt, FaUserAlt, FaTicketAlt, FaParking, FaReceipt, FaIdCard } from "react-icons/fa";
import Navitem from './navitem';

export default function SideBar() {
    const style = " inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-400";
    const [value, setValue] = useState(0);

    const onChange = (value) => {
        setValue((prev)=>value);
    }
    const pages = [
        {
            href: '/dashboard',
            ttile: 'Dashboard'
        },
        {
            href: '/dashboard/users',
            ttile: 'All Users'
        },
        {
            href: '/dashboard/users',
            ttile: 'All Users'
        },
    ];
  return (
    <div className="z-20 hidden shadow-sm w-64 overflow-y-auto bg-white md:block h-screen flex-shrink-0">
        <div className="py-4 text-gray-500">
          <Link className="ml-6 text-lg font-bold text-gray-800" href="">
            Staduim SM
          </Link>
          <ul className="mt-10">
            <li onClick={()=>onChange(0)} className="relative px-6 py-3">
              <span className={value===0?"absolute inset-y-0 left-0 w-1 bg-slate-600 rounded-tr-lg rounded-br-lg": "hidden"}
                aria-hidden="true"></span>
              <Link className={value===0?"text-slate-800"+style:"text-slate-500"+style}
                href="/dashboard">
                <FaTachometerAlt className='w-4 h-4'/>
                <span className="ml-4">Dashboard</span>
              </Link>
            </li>
            <li onClick={()=>onChange(1)} className="relative px-6 py-3">
                <span className={value===1?"absolute inset-y-0 left-0 w-1 bg-slate-600 rounded-tr-lg rounded-br-lg": "hidden"}
                aria-hidden="true"></span>
              <Link className={value===1?"text-slate-800"+style:"text-slate-500"+style}
                href="/dashboard/users">
                <FaUserAlt className='w-4 h-4'/>
                <span className="ml-4">All users</span>
              </Link>
            </li>
            <li onClick={()=>onChange(2)} className="relative px-6 py-3">
            <span className={value===2?"absolute inset-y-0 left-0 w-1 bg-slate-600 rounded-tr-lg rounded-br-lg": "hidden"}
                aria-hidden="true"></span>
              <Link className={value===2?"text-slate-800"+style:"text-slate-500"+style}
                href="/dashboard/event">
                <FaReceipt className='w-4 h-4'/>
                <span className="ml-4">Events</span>
              </Link>
            </li>
            <li onClick={()=>onChange(3)} className="relative px-6 py-3">
                <span className={value===3?"absolute inset-y-0 left-0 w-1 bg-slate-600 rounded-tr-lg rounded-br-lg": "hidden"}
                aria-hidden="true"></span>
              <Link className={value===3?"text-slate-800"+style:"text-slate-500"+style}
                href="/dashboard/ticket">
                <FaTicketAlt className='w-4 h-4'/>
                <span className="ml-4">All Tickets</span>
              </Link>
            </li>
            <li onClick={()=>onChange(4)} className="relative px-6 py-3">
            <span className={value===4?"absolute inset-y-0 left-0 w-1 bg-slate-600 rounded-tr-lg rounded-br-lg": "hidden"}
                aria-hidden="true"></span>
              <Link className={value===4?"text-slate-800"+style:"text-slate-500"+style}
                href="index.html">
                <FaParking className='w-4 h-4'/>
                <span className="ml-4">Parking Space</span>
              </Link>
            </li>
            <li onClick={()=>onChange(5)} className="relative px-6 py-3">
            <span className={value===5?"absolute inset-y-0 left-0 w-1 bg-slate-600 rounded-tr-lg rounded-br-lg": "hidden"}
                aria-hidden="true"></span>
              <Link className={value===5?"text-slate-800"+style:"text-slate-500"+style}
                href="/dashboard/employee">
                <FaIdCard className='w-4 h-4'/>
                <span className="ml-4">Employees</span>
              </Link>
            </li>

            {/* <div onClick={()=>onChange(1)}><Navitem title='Users' children={users} icon={<FaUserAlt className='w-4 h-4'/>} value='1'activevalue={isActive}/></div>
            <div onClick={()=>onChange(2)}><Navitem title='Events' children={users} icon={<FaReceipt className='w-4 h-4'/>} value='2'activevalue={isActive}/></div>
            <div onClick={()=>onChange(3)}><Navitem title='Tickets' children={users} icon={<FaTicketAlt className='w-4 h-4'/>} value='3'activevalue={isActive}/></div>
            <div onClick={()=>onChange(4)}><Navitem title='Parking' children={users} icon={<FaParking className='w-4 h-4'/>} value='4'activevalue={isActive}/></div>
            <div onClick={()=>onChange(5)}><Navitem title='Employee' children={users} icon={<FaIdCard className='w-4 h-4'/>} value='5'activevalue={isActive}/></div> */}
          </ul>
        </div>
    </div>
  )
}

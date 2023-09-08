"use client"
import Link from 'next/link';
import React from 'react'
import { FaTachometerAlt, FaUserAlt, FaTicketAlt, FaParking, FaReceipt, FaIdCard } from "react-icons/fa";
import { useSelectedLayoutSegment } from 'next/navigation';

export default function SideBar() {
    const router = useSelectedLayoutSegment()
    const style = " inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-400";
   
  return (
    <div className="z-20 hidden shadow-sm w-64 overflow-y-auto bg-white md:block h-screen flex-shrink-0">
        <div className="py-4 text-gray-500">
          <Link className="ml-6 text-lg font-bold text-gray-800" href="/dashboard">
            Staduim SM
          </Link>
          <ul className="mt-10">
            <li className="relative px-6 py-3">
              <Link className={router === null?"text-gray-800"+style:"text-gray-500"+style}
                href="/dashboard">
                <FaTachometerAlt className='w-4 h-4'/>
                <span className="ml-4">Dashboard</span>
              </Link>
            </li>
            <li className="relative px-6 py-3">
              <Link className={router === 'users'?"text-gray-800"+style:"text-gray-500"+style}
                href="/dashboard/users">
                <FaUserAlt className='w-4 h-4'/>
                <span className="ml-4">All users</span>
              </Link>
            </li>
            <li className="relative px-6 py-3">
              <Link className={router === 'event'?"text-gray-800"+style:"text-gray-500"+style}
                href="/dashboard/event">
                <FaReceipt className='w-4 h-4'/>
                <span className="ml-4">Events</span>
              </Link>
            </li>
            <li className="relative px-6 py-3">
              <Link className={router === 'ticket'?"text-gray-800"+style:"text-gray-500"+style}
                href="/dashboard/ticket">
                <FaTicketAlt className='w-4 h-4'/>
                <span className="ml-4">All Tickets</span>
              </Link>
            </li>
            <li className="relative px-6 py-3">
              <Link className={router === 'parking'?"text-gray-800"+style:"text-gray-500"+style}
                href="/dashboard/parking">
                <FaParking className='w-4 h-4'/>
                <span className="ml-4">Parking Space</span>
              </Link>
            </li>
            <li className="relative px-6 py-3">
              <Link className={router === 'refunds'?"text-gray-800"+style:"text-gray-500"+style}
                href="/dashboard/refunds">
                <FaIdCard className='w-4 h-4'/>
                <span className="ml-4">Refunds</span>
              </Link>
            </li>
            <li className="relative px-6 py-3">
              <Link className={router === 'asset'?"text-gray-800"+style:"text-gray-500"+style}
                href="/dashboard/asset">
                <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                </svg>
                <span className="ml-4">All Assets</span>
              </Link>
            </li>
            <li className="relative px-6 py-3">
              <Link className={router === 'maintance'?"text-gray-800"+style:"text-gray-500"+style}
                href="/dashboard/maintance">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                </svg>
                <span className="ml-4">Maintenance</span>
              </Link>
            </li>
          </ul>
        </div>
    </div>
  )
}

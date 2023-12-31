'use client';
import Paginator from '@/Components/admin/paginator';
import Link from 'next/link';
import React, {useEffect, useState} from 'react'
import { BsSearch } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { DeleteTicket, GetAdminTicket } from '@/Utils/AdminServer/ticket_server';
import SummaryCard from '@/Components/admin/summary_card';
import { Button } from '@material-tailwind/react';


export default function Events() {
    const style = " px-2 py-1 font-semibold leading-tight rounded-full"
    const currentIndex = '1';
    let status = 'Booked';

    const [data, setData] = useState({
      total_account: 0,
      tickets_sales: 0,
      tickets_refund: 0,
      tickets: [
        {
          id: 0,
          event: {title: ''},
          ticket_id: 0,
          user: { fullname: '' },
          seat: '',
          total: 0,
          status: '',
          quantity: 0,
          is_refund: false,
      }
      ]
    });

    useEffect(() => {
      const token = localStorage.getItem('token');
      if(!token){
          alert('You are not logged in')
          route.push('/')
      }
      GetAdminTicket(token).then((data)=>{
          if(data['message'] || data['detail']){
              alert(data['message'] || data['detail'])
          }else{
              setData(data)
          }
      }).catch((error)=>{
          alert(error)
      });
    }, []);


    const deleteTicket = (id)=>{
      const token = localStorage.getItem('token');
      DeleteTicket(token, id).then((data)=>{
          if(data['message'] || data['detail']){
              alert(data['message'] || data['detail'])
              window.location.reload()
          }else{
              alert('Ticket deleted successfully')
              window.location.reload()
          }
      }).catch((error)=>{
          alert(error)
      });
    }

  return (
    <main className='h-full overflow-y-auto'>
      <div className='container px-6 mx-auto grid'>
        <h2 className="my-6 text-2xl font-semibold text-gray-700">
          All Tickets
        </h2>
        <div className="grid gap-6 mb-8 md:grid-cols-3 xl:grid-cols-3">
            <SummaryCard 
              icon={<div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>} title='Total Account' subtitle={'Ghc '+data.total_account}/>
            <SummaryCard 
              icon={<div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                  ></path>
                </svg>
              </div>} title='Tickets sales' subtitle={data.tickets_sales}/>
              <SummaryCard 
              icon={<div className="p-3 mr-4 text-red-500 bg-blue-100 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                  ></path>
                </svg>
              </div>} title='Tickets Refund' subtitle={data.tickets_refund}/>
        </div>
        {/* Search */}
        <div>
            {/* <Button className='h-12 bg-blue-gray-600'>
                Add New Tickets
            </Button> */}
            <form className='self-end mt-6 mb-6'>   
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
                  <th className="px-4 py-3">Ticket ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Event name</th>
                  <th className="px-4 py-3">Seat</th>
                  <th className="px-4 py-3">Qty</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
              {data.tickets.map((ticket, index)=>(
              <tr key={index} className="text-gray-700">
                <td className="px-4 py-3 text-sm">
                    {ticket.ticket_id}
                </td>
                <td className="px-4 py-3">
                  <h1 className="font-semibold">{ticket.user.fullname}</h1>
                </td>
                <td className="px-4 py-3 text-sm">
                    Ghc {ticket.total}
                </td>
                <td className="px-4 py-3 text-xs">
                    <span className={ticket.status==='Approved'?"text-green-700 bg-green-100"+style:ticket.status==='Pending'? "text-orange-700 bg-orange-100"+style:
                            ticket.status==='Denied'?"text-red-700 bg-red-100"+style:"text-gray-700 bg-gray-100"+style}>
                        {ticket.status}
                    </span>
                </td>
                <td className="px-4 py-3 text-xs">
                    {ticket.event.title}
                </td>
                <td className="px-4 py-3 text-sm">
                    {ticket.seat}
                </td>
                <td className="px-4 py-3 text-sm">
                    {ticket.quantity}
                </td>
                <td className="px-4 py-3 text-sm">
                    <Link href={`ticket/`+ticket.id} className='text-purple-500 hover:underline transition ease-in duration-300'>View</Link>
                    {ticket.is_refund && <Link href='' className='ml-2 text-blue-500 hover:underline transition ease-in duration-300'>Refund</Link>}
                    <div className='ml-2 inline-block' onClick={()=>deleteTicket(ticket.id)}>
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
    </main>
  )
}

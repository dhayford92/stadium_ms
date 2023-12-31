'use client'
import SummaryCard from '@/Components/admin/summary_card'
import React, {useEffect, useState} from 'react'
import { BsSearch } from "react-icons/bs";
import Paginator from '@/Components/admin/paginator'
import { useRouter } from 'next/navigation';
import { RefundDashCall, UpdateRefund, PayRefund } from '@/Utils/AdminServer/ticket_server';
import { FaUserAlt } from "react-icons/fa";


export default function RefundPage() {
  const style = " px-2 py-1 font-semibold leading-tight rounded-full"
  const route = useRouter();
  const [currentIndex, setCurrentIndex] = useState('1');

  const [data, setData] = useState({
    total_amount: 0,
    pending_amount: 0,
    refunds: [
        {
            id: 0,
            user: {fullname: '', email: ''},
            ticket: {ticket_id: ''},
            amount: 0,
            status: '',
            is_paid: false,
            created_at: '',
        },
    ]
  })

  //-- cancel refund
  const updateRefund=(id, status)=>{
    UpdateRefund(id, status).then((data)=>{
        if(data['detail']){
            alert(data['message'] || data['detail'])
        }else{
            alert('Refund updated successfully')
            setData(data)
            window.location.reload()
        }
    }).catch((error)=>{
        alert(error)
    });
  }

//-- pay refund
const payRefund=(id)=>{
    PayRefund(id).then((data)=>{
        if(data['message'] || data['detail']){
            alert(data['message'] || data['detail'])
            window.location.reload()
        }else{
            alert('Refund cancelled')
            window.location.reload()
            setData(data)
        }
    }).catch((error)=>{
        alert(error)
    });
  }




  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
        alert('You are not logged in')
        route.push('/')
    }
    RefundDashCall(token).then((data)=>{
        if(data['message'] || data['detail']){
            alert(data['message'] || data['detail'])
        }else{
            setData(data)
        }
    }
    ).catch((error)=>{
        alert(error)
    }
    );
    
  }, [])

  return (
    <main className='h-full overflow-y-auto'>
      <div className='container px-6 mx-auto grid'>
        <h2 className="my-6 text-2xl font-semibold text-gray-700">
          All Refunds
        </h2>
        {/* summary cards */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
            <SummaryCard 
              icon={<div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>} title='Account Given' subtitle={'Ghc '+data.total_amount}/>
            <SummaryCard 
              icon={<div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>} title='Pending contacts' subtitle={data.pending_amount}/>
        </div>
        {/* Search */}
        <div className="mt-5 flex items-center justify-end mb-6">
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
                <tr
                  className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50"
                >
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Ticket ID</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {data.refunds.map((refund, index)=>(
                    <tr key={index} className="text-gray-700">
                        <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                                <div className="relative hidden w-5 h-5 mr-3 rounded-full md:block">
                                <FaUserAlt className="w-full h-full rounded-full"/>
                                <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"/>
                                </div>
                                <div>
                                <p className="font-semibold">{refund.user.fullname}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {refund.user.email}
                                </p>
                                </div>
                            </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                            {refund.ticket.ticket_id}
                        </td>
                        <td className="px-4 py-3 text-sm">
                            Ghc {refund.amount}
                        </td>
                        <td className="px-4 py-3 text-xs">
                            <span className={refund.status==='Approved'?"text-green-700 bg-green-100"+style:refund.status==='Pending'? "text-orange-700 bg-orange-100"+style:
                                    refund.status==='Denied'?"text-red-700 bg-red-100"+style:"text-gray-700 bg-gray-100"+style}>
                                {refund.status}
                            </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                            {refund.created_at}
                        </td>
                        {refund.is_paid && <td className="px-4 py-3 text-xs">
                            <span className={"text-green-700 bg-green-100"+style}>
                                Paid
                            </span>
                        </td>}
                        {refund.is_paid === false && <td className="px-4 py-3 text-sm">
                            {refund.status != 'Cancelled' && <button onClick={()=>updateRefund(refund.id, 'Cancelled')} className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'>Cancel</button>}
                            {refund.status === 'Pending' && <button onClick={()=>updateRefund(refund.id, 'Approved')} className='ml-2 bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-md'>Approved</button>}
                            {refund.status === 'Approved' && <button onClick={()=>payRefund(refund.id)}  className='ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'>Pay</button>}
                        </td>}
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
                      aria-label="Next"
                    >
                      <svg
                        className="w-4 h-4 fill-current"
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                      >
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




'use client'
import SummaryCard from '@/Components/admin/summary_card'
import TableField from '@/Components/admin/tablefield'
import React, {useEffect, useState} from 'react'
import { BsSearch } from "react-icons/bs";
import Paginator from '@/Components/admin/paginator'
import { useRouter } from 'next/navigation';
import { GetDashboard } from '@/Utils/AdminServer/core_server';


export default function Dashboard() {
  const route = useRouter();
  const [currentIndex, setCurrentIndex] = useState('1');

  const [data, setData] = useState({
    total_clients: 0,
    account_balance: 0,
    new_sales: 0,
    pending_contacts: 0,
    transactions: [
      {
        status: "",
        created_at: "",
        user : {
          fullname: "",
        }, 
        amount: 0,
        ticket: {
          event: {
            title: "",
          },
          quantity: 0,
        }

      },
    ]
  })

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
        alert('You are not logged in')
        route.push('/')
    }
    GetDashboard(token).then((data)=>{
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
          Dashboard
        </h2>
        {/* summary cards */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard 
            icon={<div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                ></path>
              </svg>
            </div>} title='Total clients' subtitle={data.total_clients}/>
            <SummaryCard 
              icon={<div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>} title='Account balance' subtitle={'Ghc '+data.account_balance}/>
            <SummaryCard 
              icon={<div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                  ></path>
                </svg>
              </div>} title='New sales' subtitle={data.new_sales}/>
            <SummaryCard 
              icon={<div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>} title='Pending contacts' subtitle={data.pending_contacts}/>
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
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {
                  data.transactions.map((trans, index)=>(
                    <TableField key={index} 
                    fullname={trans.user.fullname} 
                    ticket={trans.ticket.event.title}
                    qty={trans.ticket.quantity}
                    total={trans.amount}
                    status={trans.status}
                    date={trans.created_at}
                    />
                  ))
                }
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




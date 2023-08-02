'use client'
import React from 'react'
import { BsSearch } from "react-icons/bs";
import { useRouter } from 'next/navigation';

export default function Transaction() {
    const route = useRouter();

    const data = [
        {
          id: '123456',
          date: '2023-06-25',
          status: 'Completed',
          total: 'GH₵50.0',
        },
        {
          id: '789012',
          date: '2023-06-26',
          status: 'Pending',
          total: 'GH₵30.0',
        },
      ];

  return (
    <div className='w-full md:w-1/2 space-y-5'>
        <div className='flex flex-col spcae-y-5 md:justify-between md:flex-row md:space-y-0 md:space-x-5'>
            <div className='p-3 w-full md:w-1/2 rounded-lg shadow-lg shadow-slate-200'>
                <h1 className='font-semibold text-xl text-start'>Tickets</h1>
                <h1 className='font-bold text-4xl mt-3'>2</h1>
            </div>
            <div className='p-3 w-full md:w-1/2 rounded-lg shadow-lg shadow-slate-200'>
                <h1 className='font-semibold text-xl text-start'>Refunds</h1>
                <h1 className='font-bold text-4xl mt-3'>0</h1>
            </div>
        </div>
        <div className='relative w-full pl-5 md:pl-0 max-w-xl mr-6 focus-within:text-slate-500'>
            <BsSearch size={30} className='absolute inset-y-0 flex items-center pl-2 pt-2'/>
            <input type='text' className='pt-2 pb-2 w-full h-fit pl-8 pr-2 text-md text-gray-700 placeholder-gray-600 bg-slate-200 border-0 rounded-md focus:placeholder-slate-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-sm focus:shadow-slate-300' placeholder='search for event'/>
        </div>
        <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{item.status}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{item.total}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <button onClick={()=>route.push('invoice')} className="text-slate-500 hover:underline focus:outline-none">
                    View
                  </button>
                  <button onClick={()=>route.push('/event/checkout')} className="ml-2 text-red-500 hover:underline focus:outline-none">
                    Pay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

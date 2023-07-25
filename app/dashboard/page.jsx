import SummaryCard from '@/Components/admin/summary_card'
import React from 'react'


export default function Dashboard() {
  return (
    <main className='w-full h-full overflow-y-auto'>
      <div className='container px-6 mx-auto'>
        <h2 classNmae="my-6 text-2xl font-semibold text-gray-700">
          Dashboard
        </h2>
        {/* summary cards */}
        <div classNmae="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard 
            icon={<div classNmae="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full">
              <svg classNmae="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                ></path>
              </svg>
            </div>} title='Total clients' subtitle='6389'/>
            <SummaryCard 
              icon={<div classNmae="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
              <svg classNmae="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>} title='Account balance' subtitle='Ghc 46,760.89'/>
            <SummaryCard 
              icon={<div classNmae="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
                <svg classNmae="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                  ></path>
                </svg>
              </div>} title='New sales' subtitle='760.89'/>
            <SummaryCard 
              icon={<div classNmae="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full">
                <svg classNmae="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>} title='Pending contacts' subtitle='760.89'/>
        </div>
       
      </div>
    </main>
  )
}



//  {/* Table of transactions */}
//  <div classNmae="w-full overflow-hidden rounded-lg shadow-xs">
//  {/* <div classNmae="w-full overflow-x-auto">
//    <table classNmae="w-full whitespace-no-wrap">
//      <thead>
//        <tr
//          classNmae="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50"
//        >
//          <th classNmae="px-4 py-3">Client</th>
//          <th classNmae="px-4 py-3">Amount</th>
//          <th classNmae="px-4 py-3">Status</th>
//          <th classNmae="px-4 py-3">Date</th>
//        </tr>
//      </thead>
//      <tbody classNmae="bg-white divide-y">
//        <TableField status='Approved'/>
//        <TableField status='Pending'/>
//        <TableField status='Denied'/>
//        <TableField status='Expired'/>
//        <TableField status='Approved'/>
//        <TableField status='Pending'/>
//      </tbody>
//    </table>
//  </div> */}
//  <div classNmae="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t bg-gray-50 sm:grid-cols-9">
//    <span classNmae="flex items-center col-span-3">
//      Showing 21-30 of 100
//    </span>
//    <span classNmae="col-span-2"></span>
//    {/* Pagination */}
//    <span classNmae="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
//      <nav aria-label="Table navigation">
//        <ul classNmae="inline-flex items-center">
//          <li>
//            <button
//              classNmae="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
//              aria-label="Previous">
//              <svg
//                aria-hidden="true"
//                classNmae="w-4 h-4 fill-current"
//                viewBox="0 0 20 20">
//                <path
//                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
//                  clip-rule="evenodd"
//                  fill-rule="evenodd"
//                ></path>
//              </svg>
//            </button>
//          </li>
//          <li>
//            <button
//              classNmae="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
//            >
//              1
//            </button>
//          </li>
//          <li>
//            <button
//              classNmae="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
//            >
//              2
//            </button>
//          </li>
//          <li>
//            <button
//              classNmae="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple"
//            >
//              3
//            </button>
//          </li>
//          <li>
//            <button
//              classNmae="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
//            >
//              4
//            </button>
//          </li>
//          <li>
//            <span classNmae="px-3 py-1">...</span>
//          </li>
//          <li>
//            <button
//              classNmae="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
//            >
//              8
//            </button>
//          </li>
//          <li>
//            <button
//              classNmae="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
//            >
//              9
//            </button>
//          </li>
//          <li>
//            <button
//              classNmae="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
//              aria-label="Next"
//            >
//              <svg
//                classNmae="w-4 h-4 fill-current"
//                aria-hidden="true"
//                viewBox="0 0 20 20"
//              >
//                <path
//                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                  clip-rule="evenodd"
//                  fill-rule="evenodd"
//                ></path>
//              </svg>
//            </button>
//          </li>
//        </ul>
//      </nav>
//    </span>
//  </div>
// </div>
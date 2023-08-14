'use client'
import React from 'react'
import Link from 'next/link'
// import { get_asset } from '@/Utils/AdminServer/asset_server';
import Paginator from '@/Components/admin/paginator'
import { get_assets } from '@/Utils/AdminServer/main_server';

export default function AssetPage() {
    const [currentIndex] = React.useState('1');
    const [asset, setData] = React.useState([]);

    React.useEffect(() => {
        get_assets().then((res)=>{
            setData(res);
        });
    }, []);

  return (
    <div className='h-full overflow-y-auto'>
        <div className="container px-6 mx-auto grid">
            <h2 className="my-6 text-2xl font-semibold text-gray-700">
                All Assets
            </h2>
            <hr className="my-4"/>
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="flex-1 overflow-y-auto">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full whitespace-no-wrap">
                        <thead>
                            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">condition</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y">
                          {asset !== null && asset.map((data, index)=>(
                            <tr key={index} className="text-gray-700">
                                <td className="px-4 py-3 text-sm">
                                    {data.id}
                                </td>
                                <td className="px-4 py-3">
                                    <h1 className="font-bold">{data.name}</h1>
                                </td>
                                <td className="px-4 py-3">
                                    <h1 className="font-semibold">{data.type}</h1>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    {data.condition}
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
    </div>
    </div>
  )
}

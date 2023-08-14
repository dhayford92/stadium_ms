'use client'
import React from 'react'
import { FaChevronCircleLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export default function MaintanceDetailPage({params}) {
    const route = useRouter();
  return (
    <div className='h-full overflow-y-auto'>
        <div className="container px-6 mx-auto grid">
            <div className='flex space-x-5 items-center mb-5'>
                <div onClick={()=>route.back()}>
                    <FaChevronCircleLeft size={20} className='inline-block text-2xl cursor-pointer'/>
                </div>
                <h2 className="ml-3 text-2xl font-bold">
                    Maintance Detail
                </h2>
                <span class="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-blue-400">
                    <svg class="w-2.5 h-2.5 mr-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                    </svg>
                    2022-01-01
                </span>
            </div>
            <hr className="my-4"/>
            <div className="flex flex-col md:flex-row md:space-x-5 space-y-4">
                    <form className="flex-1 flex-col space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-600 font-semibold mb-1">
                                Asset Name
                            </label>
                            <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"/>
                        </div>
                        <div className='grid gap-4 grid-cols-2'>
                            <div>
                                <label htmlFor="type" className="block text-gray-600 font-semibold mb-1">
                                    Type
                                </label>
                                <select id="type" name="type" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none">
                                    <option value="Physical">Physical</option>
                                    <option value="Equipment">Equipment</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="condition" className="block text-gray-600 font-semibold mb-1">
                                    Condition
                                </label>
                                <select id="condition" name="condition" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none">
                                    <option value="New">New</option>
                                    <option value="Used">Used</option>
                                    <option value="Damaged">Damaged</option>
                                    <option value="Under Maintainace">Under Maintainace</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-gray-600 font-semibold mb-1">
                             Description
                            </label>
                            <textarea id="description" name="description" rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"></textarea>
                        </div>
                        <button type="submit" className="button w-[200px]">
                            Save
                        </button>
                    </form>
                </div> 
        </div>
    </div>
  )
}
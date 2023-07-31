import React from 'react'

export default function UserDetail({params}) {
  return (
    <div className='h-full overflow-y-auto'>
        <div className="container px-6 mx-auto grid">
            <h2 className="my-6 text-2xl font-semibold text-gray-700">
                User Detail
            </h2>
            {/* -- User Detail -- */}
            <div className='md:w-2/3'>
                <div className='flex flex-col space-y-5  md:flex-row md:space-x-5'>
                    <div className='flex flex-col space-y-2 md:w-1/2 bg-white border rounded-xl shadow-xl shadow-slate-100 p-5'>
                        <label className='text-gray-500'>Full Name</label>
                        <input type='text' className='w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline'/>
                        <label className='text-gray-500'>Email</label>
                        <input type='email' className='w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline'/>
                        <label className='text-gray-500'>Phone Number</label>
                        <input type='text' className='w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline'/>
                        <button className='w-full h-10 px-3 text-base text-white bg-purple-600 rounded-lg focus:shadow-outline'>Update</button>
                    </div>
                    <div className='flex flex-col space-y-2 md:w-1/2 bg-white border rounded-xl shadow-xl shadow-slate-100 p-5'>
                        <label className='text-gray-500'>Password</label>
                        <input type='password' className='w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline'/>
                        <label className='text-gray-500'>Confirm Password</label>
                        <input type='password' className='w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline'/>
                        <button className='w-full h-10 px-3 text-base text-white bg-purple-600 rounded-lg focus:shadow-outline'>Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

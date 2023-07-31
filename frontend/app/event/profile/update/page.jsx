import React from 'react'

export default function UpdateProfile() {
  return (
    <div className='w-full md:w-1/2 bg-white rounded-xl shadow-lg p-8 text-gray-600'>
        <form action='/' className='flex flex-col space-y-3 w-full'>
            <div className='flex flex-col space-y-4'>
                <label for='' className='font-bold text-md'>Your username</label>
                <input type='text' placeholder='Your name' 
                className='ring-1 ring-gray-200 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-slate-300'/>
            </div>
            <div className='flex flex-col space-y-4'>
                <label for='' className='font-bold text-md'>Your email</label>
                <input type='text' placeholder='Your email' 
                className='ring-1 ring-gray-200 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-slate-300'/>
            </div>
            <div className='flex flex-col space-y-4'>
                <label for='' className='font-bold text-md'>Your password</label>
                <input type='password' placeholder='*******' 
                className='ring-1 ring-gray-200 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-slate-300'/>
            </div>
            <button className='inline-block self-end bg-slate-500 text-white text-xl font-semibold rounded-lg h-10 px-6 py-2 uppercase'>Update Profile</button>
        </form>
    </div>
  )
}

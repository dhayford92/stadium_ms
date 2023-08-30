'use client'
import React from 'react'
import { FaChevronCircleLeft } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { CreateUser } from '@/Utils/AdminServer/user_server';

export default function CreateUserPage() {
  const route = useRouter();

  const submitForm = (e) => {
    e.preventDefault();
    const body = {
      fullname: e.target.name.value,
      email: e.target.email.value,
      number: e.target.phone.value,
      is_staff: e.target.role.value,
      password: e.target.password.value,
    }
    const token = localStorage.getItem('token');
  
    CreateUser(token, body).then((data)=>{
      alert(data['message'] || data['detail'] || data['email'] || data['number'] || data['password'])
      if (data['message']) {
        route.push('/dashboard/users')
      }
    }).catch((error)=>{
      alert(error)
    });
  }

  return (
    <div className='h-full overflow-y-auto'>
      <div className="container px-6 mx-auto grid">
        <div className='flex space-x-5 items-center mb-5'>
          <div onClick={()=>route.back()}>
            <FaChevronCircleLeft size={20} className='inline-block text-2xl cursor-pointer'/>
          </div>
          <h2 className="ml-3 text-2xl font-bold">
            Add User Modal
          </h2>
        </div>
        
        <hr className="my-4"/>
        <form className="space-y-4" onSubmit={(e)=>submitForm(e)}>
          <div>
            <label htmlFor="name" className="block text-gray-600 font-semibold mb-1">
              Name
            </label>
            <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-white"/>
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-600 font-semibold mb-1">
              Email
            </label>
            <input type="text" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-white"/>
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-600 font-semibold mb-1">
              Phone number
            </label>
            <input type="text" id="phone" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-white"/>
          </div>
          <div>
            <label htmlFor="role" className="block text-gray-600 font-semibold mb-1">
              Role
            </label>
            <select id="role" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-white">
              <option value="true">Employee</option>
              <option value="false">User</option>
            </select>
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-600 font-semibold mb-1">
              Password
            </label>
            <input type="password" id="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-white"/>
          </div>
          <div>
            <label htmlFor="confirmpassword" className="block text-gray-600 font-semibold mb-1">
              Confirm Password
            </label>
            <input type="password" id="confirmpassword" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-white"/>
          </div>
          <hr className="my-4"/>
          <button type="submit" className="button">
            Add User
          </button>
        </form>
      </div>
    </div>
  )
}

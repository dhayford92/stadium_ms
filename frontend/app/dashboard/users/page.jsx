'use client'
import Link from 'next/link';
import React, {useState, useEffect} from 'react'
import { BsSearch } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { GetAllUsers, DeleteUser } from '@/Utils/AdminServer/user_server';
import Paginator from '@/Components/admin/paginator';

export default function Users() {
  const route = useRouter();
  const [currentIndex, setCurrentIndex] = useState('1');
  const [data, setData] = useState([]);

  const deleteUser = (id) => {
    const token = localStorage.getItem('token');
    DeleteUser(token, id).then((data)=>{
      alert(data['message'])
      window.location.reload()
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
    GetAllUsers(token).then((user)=>{
      if(user['message'] || user['detail']){  
        alert(user['message'] || user['detail'])
      }else{
        setData(user)
      }
    }).catch((error)=>{
      alert(error)
    });
  }, []);

  return (
    <main className='h-full overflow-y-auto'>
      <div className='container px-6 mx-auto grid'>
        <h2 className="my-6 text-2xl font-semibold text-gray-700">
          All Users
        </h2>
        {/* Search */}
        <div className="mt-5 flex items-center justify-between mb-6">
            <button onClick={()=>route.push('users/add')}
            className='px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-300 hover:text-slate-800 transition-colors ease-in-out duration-300'>Add New User</button>
          <div className='relative w-full pl-5 md:pl-0 max-w-xl mr-6 focus-within:text-slate-500'>
            <BsSearch size={25} className='absolute inset-y-0 flex items-center pl-2 pt-2'/>
            <input type='text' className='pt-1 pb-1 w-full h-fit pl-10 pr-2 text-md text-gray-700 placeholder-gray-600 bg-slate-200 border-0 rounded-md focus:placeholder-slate-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-sm focus:shadow-slate-300' placeholder='search for users'/>
          </div>
        </div>
         {/* Table of transactions */}
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                  <th className="px-4 py-3">Fullname</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone Number</th>
                  <th className="px-4 py-3">Employee</th>
                  <th className="px-4 py-3">Login Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
              {data.map((user, index)=>(
                <tr key={index} className="text-gray-700">
                  <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                          <div className="relative hidden w-5 h-5 mr-3 rounded-full md:block">
                              <FaUserAlt className="w-full h-full rounded-full"/>
                              <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"/>
                              </div>
                              <div>
                              <p className="font-semibold">{user.fullname}</p>
                          </div>
                      </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                      {user.email}
                  </td>
                  <td className="px-4 py-3 text-xs">
                      <span className=''>
                          {user.number}
                      </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                      {user.is_staff? 'Yes': 'No'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                      {user.last_login}
                  </td>
                  <td className="px-4 py-3 text-sm">
                      <Link href={`/dashboard/users/${user.id}`} className=' text-purple-500 hover:underline transition ease-in duration-300'>View</Link>
                      <Link onClick={()=>deleteUser(user.id)} href='' className='ml-2 text-red-500 hover:underline transition ease-in duration-300'>Delete</Link>
                  </td>
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
                      className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                    >
                      4
                    </button>
                  </li>
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Next">
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

'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function navbar() {
    const route = useRouter();
    const [profileOpen, setProfileOpen] = useState(false);
    const [notOpen, setNoteOpen] = useState(false);

    const closeNot = () => {
        setNoteOpen((prev)=>!prev);
        setProfileOpen(false);
    }
    const closePro = () => {
        setProfileOpen((prev)=>!prev);
        setNoteOpen(false);
    }

    const Logout = async () => {
        const token = localStorage.getItem('token');
        if(!token){
            alert('You are not logged in')
            return
        }
        const response = await fetch('http://127.0.0.1:8000/api/user/logout/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        if(response.status === 204){
            localStorage.removeItem('token');
            route.push('/')
            alert(`Logged out successfully`)
        }else{
            alert(`${data['detail']}`)
        }
    }

  return (
    <header className='z-20 w-full py-4 bg-white shadow-md flex justify-between items-center pr-5 pl-8 sticky top-0'>
        <button className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple" aria-label="Menu">
            <svg className="w-6 h-6" aria-hidden="true"  fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"></path>
            </svg>
        </button>
        <h1 className='hidden font-bold text-xl text-center md:block'>Stadium Management System</h1>
        <ul className="flex items-center flex-shrink-0 space-x-6">
            <li className="relative">
                <button
                    onClick={()=>closeNot()}
                    className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
                    aria-label="Notifications"
                    aria-haspopup="true">
                    <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                        d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                    ></path>
                    </svg>
                    <span
                    aria-hidden="true"
                    className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                    ></span>
                </button>
                <div className={notOpen===true?'':'hidden'}>
                    <ul className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md "
                    >
                    <li className="flex">
                        <a className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                        href="#">
                        <span>Messages</span>
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-600"
                        > 13
                        </span>
                        </a>
                    </li>
                    <li className="flex">
                        <a className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                        href="#"
                        >
                        <span>Sales</span>
                        <span
                            className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-600"
                        >
                            2
                        </span>
                        </a>
                    </li>
                    <li className="flex">
                        <a
                        className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                        href="#"
                        >
                        <span>Alerts</span>
                        </a>
                    </li>
                    </ul>
                </div>
                </li>
                <li className="relative">
                <button
                onClick={()=>closePro()}
                    className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                    aria-label="Account"
                    aria-haspopup="true">
                    <img className="object-cover w-8 h-8 rounded-full"
                    src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                    alt=""
                    aria-hidden="true"/>
                </button>
                <div className={profileOpen===true?'':'hidden'}>
                    <ul className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md"
                    aria-label="submenu">
                    <li className="flex">
                        <a className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                        href="#">
                        <svg className="w-4 h-4 mr-3"
                            aria-hidden="true"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <span>Profile</span>
                        </a>
                    </li>
                    <li className="flex">
                        <a className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                        href="#">
                        <svg className="w-4 h-4 mr-3"
                            aria-hidden="true"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            ></path>
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span>Settings</span>
                        </a>
                    </li>
                    <li className="flex">
                        <button  onClick={()=>Logout()} className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                        >
                        <svg
                            className="w-4 h-4 mr-3"
                            aria-hidden="true"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            ></path>
                        </svg>
                        <span>Log out</span>
                        </button>
                    </li>
                    </ul>
                </div>
            </li>
        </ul>
    </header>
  )
}

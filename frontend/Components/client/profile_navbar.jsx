'use client'
import React, {useState} from 'react'
import { useRouter } from 'next/navigation';

export default function ProfileNavBar() {
    const route = useRouter();
    const [currentIndex, setCurrentIndex] = useState(1);
    const navitems = [
        {
            id: 1,
            name: "Transaction",
        },
        {
            id: 2,
            name: "Update Profile",
        },

    ]

    const changePage = (id) => {
        setCurrentIndex((prev)=>prev=id);
        if(id === 1) route.replace('/event/profile')
        if(id === 2) route.replace('profile/update')
    }

    const Logout = async () => {
        const user = localStorage.getItem('token');
        if(!user){
            alert('You are not logged in')
            return
        }

        const response = await fetch('http://127.0.0.1:8000/api/user/logout/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user}`,
            }
        })

        const data = await response.json()

        if(response.status === 204){
            localStorage.removeItem('token');
            localStorage.removeItem('cart');
            alert(`${data['message']}`)
            route.push('/')
        }else{
            alert(`${data['detail']}`)
        }
    }

  return (
    <div className='w-full p-3 md:w-1/6  rounded-xl shadow-xl shadow-slate-200'>
        <h1 className='hidden md:block mb-5 text-2xl font-extrabold border-b-2 pb-3'>Dashboard</h1>
        <ul className='w-full font-semibold text-xl flex flex-row items-center space-x-5 md:space-x-0 text-start  md:flex-col md:justify-start md:items-start overflow-y-hidden overflow-scroll md:overflow-hidden'>
            {navitems.map((navItem)=>(
                <li onClick={()=>changePage(navItem.id)}
                className={
                    navItem.id === currentIndex? 'p-2 bg-slate-500 text-white rounded-lg cursor-pointer'
                    : 'cursor-pointer rounded-lg p-2 hover:text-2xl hover:text-white hover:bg-slate-500 hover:transition ease-in duration-200'} 
                key={navItem.id}>{navItem.name}</li>
                ))}
            <li onClick={()=>Logout()} className='cursor-pointer p-2 rounded-lg hover:text-2xl hover:text-white hover:bg-slate-500 hover:transition ease-in duration-200'>Logout</li>
        </ul>
    </div>
  )
}

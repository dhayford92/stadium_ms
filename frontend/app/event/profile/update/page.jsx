'use client'
import React, {useState, useEffect} from 'react'
import { GetUserDetail } from '@/Utils/ClientServer/event_server';
import { useRouter } from 'next/navigation';

export default function UpdateProfile() {
    const route = useRouter();

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            alert('You are not logged in')
            route.push('/')
        }
        GetUserDetail(token).then((data)=>{
            if(data['message'] || data['detail']){
                alert(data['message'] || data['detail'])
            }else{
                setUser(data)
                setLoading(false)
            }
        }).catch((error)=>{
            alert(error)
        });
    }, []);

    const updateProfile = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if(!token){
            alert('You are not logged in')
            route.push('/')
        }
        const body = {
            number: e.target.number.value,
            }
        UpdateProfile(token, body).then((data)=>{
            if(data['message'] || data['detail']){
                alert(data['message'] || data['detail'])
            }else{
                alert(data['message'])
                route.push('/event/profile')
            }
        }).catch((error)=>{
            alert(error)
        });
    }


  return (
    <div className='w-full md:w-1/2 bg-white rounded-xl shadow-lg p-8 text-gray-600'>
        <form onSubmit={(e)=>updateProfile(e)} className='flex flex-col space-y-3 w-full'>
            <div className='flex flex-col space-y-4'>
                <label for='' className='font-bold text-md'>Your fullname</label>
                <input type='text' placeholder={user.fullname} disabled={loading || true}
                className='bg-white ring-1 text-gray-800 ring-gray-200 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-slate-300'/>
            </div>
            <div className='flex flex-col space-y-4'>
                <label for='' className='font-bold text-md'>Your email</label>
                <input type='text' placeholder={user.email} disabled={loading || true}
                className='bg-white text-gray-800 ring-1 ring-gray-200 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-slate-300'/>
            </div>
            <div className='flex flex-col space-y-4'>
                <label for='' className='font-bold text-md'>Your number</label>
                <input type='phone' name='number' placeholder={user.number} disabled={loading}
                className='bg-white text-gray-800 ring-1 ring-gray-200 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-slate-300'/>
            </div>
            <button type='submit' className='inline-block self-end bg-slate-500 text-white text-xl font-semibold rounded-lg h-10 px-6 py-2 uppercase'>Update Profile</button>
        </form>
    </div>
  )
}

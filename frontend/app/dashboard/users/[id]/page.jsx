'use client'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { FaChevronCircleLeft } from "react-icons/fa";
import { GetUser, UpdateUser } from '@/Utils/AdminServer/user_server';
import { Button } from '@material-tailwind/react';


export default function UserDetail({params}) {
    const route = useRouter();
    const [user, setUser] = useState({});

    const submitForm = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if(!token){
            alert('You are not logged in')
            route.push('/')
        }
        const body = {
            number: e.target.number.value,
            is_staff: e.target.is_staff.value,
            fullname: e.target.fullname.value,
        }

        UpdateUser(token, params.id, body).then((data)=>{
            if(data['message'] || data['detail']){
                alert(data['message'] || data['detail'])
            }else{
                alert(data['message'] || data['detail'])
                route.push('/dashboard/users')
            }
        }
        ).catch((error)=>{
            alert(error)
        });
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            alert('You are not logged in')
            route.push('/')
        }
        GetUser(token, params.id).then((data)=>{
            if(data['message'] || data['detail']){
                alert(data['message'] || data['detail'])
            }else{
                setUser(data)
            }
        }).catch((error)=>{
            alert(error)
        });
    }, []);



  return (
    <div className='h-full overflow-y-auto'>
        <div className="container px-6 mx-auto grid">
            <div className='flex space-x-5 items-center mb-5'>
            <div onClick={()=>route.back()}>
                <FaChevronCircleLeft size={20} className='inline-block text-2xl cursor-pointer'/>
            </div>
            <h2 className="ml-3 text-2xl font-bold">
                User Detail
            </h2>
            </div>
            <div className='md:w-2/3'>
                <div className='flex flex-col space-y-5  md:flex-row md:space-x-5'>
                    <form onSubmit={(e)=>submitForm(e)} className='flex flex-col space-y-2 md:w-1/2 bg-white border rounded-xl shadow-xl shadow-slate-100 p-5'>
                        <label className='text-gray-500'>Full Name</label>
                        <input type='text' 
                            name='fullname'
                            value={user.fullname} 
                            className='bg-white w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline'
                            />
                        <label className='text-gray-500'>Email</label>
                        <input type='email' value={user.email}
                            disabled={true} 
                            className='bg-white w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline'/>
                        <label className='text-gray-500'>Phone Number</label>
                        <input type='text' value={user.number} name='number'
                        className='bg-white w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline'/>
                        <label className='text-gray-500'>Role</label>
                        <select name='is_staff' className='w-full h-10 bg-white px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline'>
                            <option selected={user.is_staff} value='true'>Employee</option>
                            <option selected={user.is_staff} value='false'>Client</option>
                        </select>
                        {/* <input type='text' value={user.is_staff? 'Employee': 'Client'} className='w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline'/> */}
                        <Button className='bg-gray-600 w-full h-10'>Update</Button>
                    </form>
                    <div className='flex flex-col space-y-2 md:w-1/2 bg-white border rounded-xl shadow-xl shadow-slate-100 p-5'>
                        <label className='text-gray-500'>Password</label>
                        <input type='password' className='bg-white w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline'/>
                        <label className='text-gray-500'>Confirm Password</label>
                        <input type='password' className='bg-white w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline'/>
                        <button className='w-full h-10 px-3 text-base text-white bg-slate-600 rounded-lg focus:shadow-outline'>Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)};

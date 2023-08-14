'use client';
import React from "react";
import { FaChevronCircleLeft } from "react-icons/fa";
import { get_park_by_id, update_park_by_id, delete_park_by_id } from '@/Utils/AdminServer/park_server';
import { GetAllUsers } from '@/Utils/AdminServer/user_server';
import { useRouter } from 'next/navigation';


export default function ParkingDetailPage({ params }) {
    const route = useRouter();
    const [park, setPark] = React.useState({
        id: 1,
        is_booked: false,
        price: 0,
        title: 'Parking 1',
    });
    const [users, setUsers] = React.useState([]);
    const [edit, setEdit] = React.useState(true);

    const update = (e) => {
        setEdit(!edit);
        e.preventDefault();
        body = {
            user: e.target.users.value,
        }
        update_park_by_id(park.id, body).then((data) => {
            setPark(data);
        });

    };

    const delete_park = () => {
        delete_park_by_id(park.id).then((data) => {
            route.back();
        });
    };

    React.useEffect(() => {
        // fetch data from api
        const token = localStorage.getItem('token');
        GetAllUsers(token).then((data) => {
            setUsers(data);
        });
        get_park_by_id(params.id).then((data) => {
            setPark(data);
        });

    }, []);




    return (
        <div className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <div className="flex space-x-5 items-center mb-5">
                    <div onClick={() => route.back()}>
                        <FaChevronCircleLeft
                            size={20}
                            className="inline-block text-2xl cursor-pointer"
                        />
                    </div>
                    <h2 className="ml-3 text-2xl font-bold">Parking Detail</h2>
                    {park.is_booked && <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-sm font-semibold text-green-800 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-300">
                        <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                        </svg>
                        <span className="sr-only">Icon description</span>
                    </span>}
                     <div className="flex-1 text-right">
                        <button onClick={()=>delete_park()} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
                            Delete
                        </button>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="flex flex-col md:flex-row md:space-x-5 space-y-4">
                    <form className="flex-1 flex-col space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-gray-600 font-semibold mb-1">
                                Parking Name
                            </label>
                            <input type="text" id="title" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none" value={park.title} disabled/>
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-gray-600 font-semibold mb-1">
                                Price
                            </label>
                            <input type="number" id="price" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none" value={park.price} disabled/>
                            <p className='text-gray-400 text-sm'>*Price per ticket</p>
                            <p className='text-gray-400 text-sm'>*Price may vary</p>
                        </div>
                        <div>
                            <label htmlFor="users" className="block text-gray-600 font-semibold mb-1">
                                Users
                            </label>
                            <select id="users" name="users" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none" value={park.users} disabled={edit}>
                                {users.map((user) => (
                                    <option value={user.id}>{user.fullname}</option>
                                ))}
                            </select>
                        </div>
                        {park.is_booked == false && <div>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none" onClick={() => setEdit(!edit)}>
                                {edit ? 'Edit' : 'Save'}
                            </button>
                        </div>
                        }
                    </form>
                </div> 
            </div>
        </div>
    ); 
}
    
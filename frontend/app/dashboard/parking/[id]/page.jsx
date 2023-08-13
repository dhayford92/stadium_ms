'use strict';
import React from "react";
import { FaChevronCircleLeft } from "react-icons/fa";


class Park{
    constructor(title, price, capacity){
        this.title = title;
        this.price = price;
        this.capacity = capacity;
    }

    static fromJson(json){
        return new Park(json.title, json.price, json.capacity);
    }

    toJson(){
        return {
            title: this.title,
            price: this.price,
            capacity: this.capacity
        }
    }
}

export default function ParkingDetailPage({ params }) {
    var park = Park.fromJson(params);
    var edit = true;

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
                </div>
                <hr className="my-4" />
                <div className="flex flex-col md:flex-row md:space-x-5 space-y-4">
                    <div className="flex-1 flex-col space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-gray-600 font-semibold mb-1">
                                Parking Name
                            </label>
                            <input type="text" id="title" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none" value={park.title} disabled={edit}/>
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-gray-600 font-semibold mb-1">
                                Price
                            </label>
                            <input type="number" id="price" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none" value={park.price} disabled={edit}/>
                            <p className='text-gray-400 text-sm'>*Price per ticket</p>
                            <p className='text-gray-400 text-sm'>*Price may vary</p>
                        </div>
                        <div>
                            <label htmlFor="capacity" className="block text-gray-600 font-semibold mb-1">
                                Capacity
                            </label>
                            <input type="number" id="capacity" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none" value={park.capacity} disabled={edit}/>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    ); 
}
    
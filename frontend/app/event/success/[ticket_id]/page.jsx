'use client'
import React from 'react';
import { useRouter } from 'next/navigation'


const SuccessfulMessagePage = ({params}) => {
    const route = useRouter();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p className="text-gray-600 mb-2">Your ticket purchase was successful.</p>
        <p className="text-gray-600 mb-4">Ticket ID: {params.ticket_id}</p>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <button onClick={()=> route.replace('/event')} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-4 md:mb-0">
            Continue to Purchase More Tickets
          </button>
          <button onClick={()=> route.push('/event/parking/'+params.ticket_id)} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
            Add Parking Space
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulMessagePage;

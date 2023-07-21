import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Card({ index, title, image, price, date, route }) {
    
  return (
    <Link key={index} href={route}>
        <div className="flex-shrink-0 w-64 p-4 bg-white rounded-lg shadow-lg mx-4 mt-4 sm:mt-0 hover:transition ease-out duration-300 hover:shadow-none">
          <div className='relative h-40 w-full object-cover rounded-t-lg overflow-hidden'>
            <Image src={image} alt={title} className='absolute' fill={true}/>
          </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 mb-2">{price}</p>
                <p className="text-gray-600">{date}</p>
            </div>
        </div>
    </Link>
    
  )
}

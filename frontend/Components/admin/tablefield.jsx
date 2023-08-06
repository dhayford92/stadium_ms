import React from 'react'
import { FaUserAlt } from "react-icons/fa";

export default function TableField({fullname, qty, ticket, total, status, date}) {
    const style = " px-2 py-1 font-semibold leading-tight rounded-full"
  return (
    <tr className="text-gray-700">
        <td className="px-4 py-3">
            <div className="flex items-center text-sm">
                <div className="relative hidden w-5 h-5 mr-3 rounded-full md:block">
                <FaUserAlt className="w-full h-full rounded-full"/>
                <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"/>
                </div>
                <div>
                <p className="font-semibold">{fullname}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    {qty}x {ticket}
                </p>
                </div>
            </div>
        </td>
        <td className="px-4 py-3 text-sm">
            Ghc {total}
        </td>
        <td className="px-4 py-3 text-xs">
            <span className={status==='Approved'?"text-green-700 bg-green-100"+style:status==='Pending'? "text-orange-700 bg-orange-100"+style:
                    status==='Denied'?"text-red-700 bg-red-100"+style:"text-gray-700 bg-gray-100"+style}>
                {status}
            </span>
        </td>
        <td className="px-4 py-3 text-sm">
            {date}
        </td>
    </tr>
  )
}



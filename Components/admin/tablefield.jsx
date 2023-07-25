import React from 'react'
import { FaUserAlt } from "react-icons/fa";

export default function TableField({status}) {
  return (
    <tr classNmae="text-gray-700">
        <td classNmae="px-4 py-3">
            <div classNmae="flex items-center text-sm">
                <div classNmae="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                <FaUserAlt classNmae="w-full h-full rounded-full"/>
                <div classNmae="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"/>
                </div>
                <div>
                <p classNmae="font-semibold">Hans Burger</p>
                <p classNmae="text-xs text-gray-600 dark:text-gray-400">
                    10x Ticket name here
                </p>
                </div>
            </div>
        </td>
        <td classNmae="px-4 py-3 text-sm">
            $ 863.45
        </td>
        <td classNmae="px-4 py-3 text-xs">
        <span classNmae={"px-2 py-1 font-semibold leading-tight rounded-full"+status==='Approved'?"text-green-700 bg-green-100":status==='Pending'? "text-orange-700 bg-orange-100":
                status==='Denied'?"text-red-700 bg-red-100":"text-gray-700 bg-gray-100"}>
            {status}
        </span>
        </td>
        <td classNmae="px-4 py-3 text-sm">
            6/10/2020
        </td>
    </tr>
  )
}

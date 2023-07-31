import React, {useState} from 'react'

export default function Navitem({ title, children, icon, value, activevalue}) {
    
  return (
    <li className="relative px-6 py-3">
        <span className={value===activevalue?"absolute inset-y-0 left-0 w-1 bg-slate-600 rounded-tr-lg rounded-br-lg":"hidden"}
            aria-hidden="true"></span>
        <button className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-500">
        <span className="inline-flex items-center">
            {icon}
            <span className="ml-4">{title}</span>
        </span>
        <svg
            className="w-4 h-4"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"></path>
        </svg>
        </button>
        <div className={value===activevalue?'':'hidden'}>
            <ul className="x-transition:enter:transition-all ease-in-out duration-300 x-transition:enter-start:opacity-25 enter:max-h-0
                x-transition:leave-end:opacity-0 x-transition:leave-end:max-h-0 p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50"
                aria-label="submenu">
                 {children.map((item, index)=>{
                    <li key={index} className="px-2 py-1 transition-colors duration-150 hover:text-gray-400">
                        <a className="w-full" href={item.href}>{item.title}</a>
                    </li>
                 })}   
                
            </ul>
        </div>
    </li>
  )
}

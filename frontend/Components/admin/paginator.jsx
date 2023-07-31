import React from 'react'

export default function Paginator({value, currentIndex}) {
  return (
    <button className={currentIndex===value?"px-3 py-1 text-white transition-colors duration-150 bg-slate-600 border border-r-0 border-slate-600 rounded-md focus:outline-none focus:shadow-outline-purple":
    "px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"}>
        {value}
    </button>
  )
}

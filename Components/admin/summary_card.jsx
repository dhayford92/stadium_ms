import React from 'react'

export default function SummaryCard({icon, title, subtitle}) {
  return (
    <div class="flex items-center p-4 bg-white rounded-lg shadow-xs shadow-slate-500">
        {icon}
        <div>
            <p class="mb-2 text-sm font-medium text-gray-600">
                {title}
            </p>
            <p class="text-lg font-semibold text-gray-700">
                {subtitle}
            </p>
        </div>
    </div>
  )
}

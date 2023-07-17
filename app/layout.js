import Navbar from '@/Components/client/navbar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Event',
  description: 'Booking system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='bg-slate-50 text-[#1e293b] w-full h-screen'>
          {children}
        </div>
      </body>
    </html>
  )
}

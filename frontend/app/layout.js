"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { ChatBubbleIcon } from '@heroicons/react/24/outline'
import { IconButton, Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Input,
  Typography, } from "@material-tailwind/react";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Event',
  description: 'Booking system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='bg-gray-50 text-[#1e293b] w-full'>
          {children}
        </div>
        {/* Floating Chat Assistant */}
        <div className='fixed bottom-4 right-4'>
          <Popover placement="top-end">
            <PopoverHandler>
              <IconButton icon={<ChatBubbleIcon className='h-10 w-10 text-gray-900'/>} color='red'
                size='lg'/>
            </PopoverHandler>
            <PopoverContent className="w-96">
              <Typography variant="h6" color="blue-gray" className="mb-6">
                Conatct Us
              </Typography>
              <div className="flex flex-col space-y-2">
                <Input label="Username" />
                <Input label="Email Address" />
                <Input label="Message" textarea />
                <Button variant="gradient">Send</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </body>
    </html>
  )
}

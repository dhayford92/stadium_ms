import React from 'react'
import Image from 'next/image'
import {AiOutlineMail, AiOutlinePhone, AiOutlineHeatMap} from 'react-icons/ai'

export const metadata = {
  title: 'Event | About us',
  description: 'This is about the site',
}

export default function About() {

    
  return (
    <div className='h-screen bg-fixed bg-center bg-cover custom-img'>
      <div className='flex w-full min-h-screen justify-center items-center'>
          <div className='flex flex-col md:flex-row space-y-6 md:space-x-6 bg-slate-600 w-full max-w-4xl p-8 rounded-xl shadow-lg text-white'>
            <div className='flex flex-col space-y-10 justify-between'>
              <div>
                <h1 className='font-bold text-4xl tracking-wide'>Contact Us</h1>
                <p className='pt-2 text-slate-300'>
                Stadium management system is a web application, that helps manage various aspects of a stadium,
                including ticketing, scheduling, and event management and facility. 
                It provides a centralized platform for stadium administrators to manage all 
                aspects of a stadium's operations, from scheduling events to 
                tracking tickest sales and managing facility.
                </p>
              </div>
              <div className='flex flex-col space-y-7'>
                <div className='inline-flex space-x-2 items-center'>
                  <AiOutlineMail size={30} className='text-teal-300 text-xl'/>
                  <h2>info@gmail.com</h2>
                </div>
                <div className='inline-flex space-x-2 items-center'>
                  <AiOutlinePhone size={30} className='text-teal-300 text-xl'/>
                  <h2>+233 24 020 9723</h2>
                </div>
                <div className='inline-flex space-x-2 items-center'>
                  <AiOutlineHeatMap size={30} className='text-teal-300 text-xl'/>
                  <h2>Ghana, Greater Accra - Tesano</h2>
                </div>
              </div>
            </div>
            <div>
                <div className='bg-white rounded-xl shadow-lg p-8 text-gray-600'>
                  <form action='/' className='flex flex-col space-y-3 md:w-80'>
                    <div className='flex flex-col space-y-4'>
                      <label for='' className='font-bold text-md'>Your name</label>
                      <input type='text' placeholder='Your name' 
                        className='ring-1 ring-gray-200 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300'/>
                    </div>
                    <div className='flex flex-col space-y-4'>
                      <label for='' className='font-bold text-md'>Your email</label>
                      <input type='text' placeholder='Your email' 
                        className='ring-1 ring-gray-200 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300'/>
                    </div>
                    <div className='flex flex-col space-y-4'>
                      <label for='' className='font-bold text-md'>Your message</label>
                      <textarea rows='4' placeholder='Your message' 
                        className='ring-1 ring-gray-200 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300'></textarea>
                    </div>
                    <button className='inline-block self-end bg-slate-500 text-white text-xl font-semibold rounded-lg h-20 px-6 py-2 uppercase'>Send Message</button>
                  </form>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
}
 
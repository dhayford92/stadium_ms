'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'Event | Login',
  description: 'Sign in to get access',
}

export default function Home() {
  const route = useRouter();

  const handleLogin = (e) => {
    route.push('/event');
  }
  
  return (
    <main className="flex min-h-screen w-full items-center justify-center p-5">
      <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl'>
        <div className='flex flex-col overflow-y-auto md:flex-row'>
          {/* image side  */}
          <div className='overflow-hidden h-30 md:h-auto md:w-1/2 relative object-contain'>
            <Image className='absolute' src='/login.png' fill={true}/>
          </div>
          {/* login form side  */}
          <div className='w-full p-5 md:w-1/2 md:p-24 rounded-2xl md:rounded-0 flex flex-col'>
            <h1 className='mb-4 text-xl font-semibold text-gray-700 uppercase'>Login</h1>
            <form action='/event' className='mt-10 flex flex-col space-y-5' onSubmit={(e)=>handleLogin(e)}>
              <label class="block text-sm">
                <span class="text-gray-700">Email</span>
                <input
                  class="auth-input"
                  placeholder="yourmail@mail.com"
                />
              </label>
              <label class="block mt-4 text-sm">
                <span class="text-gray-700">Password</span>
                <input
                  class="auth-input"
                  placeholder="***************"
                  type="password"
                />
              </label>
              <button className='w-full button'>Sign In</button>
            </form>
            <hr class="my-8" />
            <p class="mt-4">
                <Link
                  class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline" href="">
                  Forgot your password?
                </Link>
            </p>
            <p class="mt-1">
              <Link
                class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                href="/register"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
      
    </main>
  )
}

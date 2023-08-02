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

  const login = async (e) =>{
    e.preventDefault()
    const email = e.target[0]
    const password = e.target[1]
    const response = await fetch('http://127.0.0.1:8000/api/user/login/', {
        method: 'POST',
        body: JSON.stringify({
            email: email.value,
            password: password.value
        }),
        headers: {
            'Content-Type': 'application/json',
        }
      })
      const data = await response.json()

      if(response.status === 200){
          localStorage.setItem('token', data['token']['access'])
          data['is_staff'] === true ? route.push('/dashboard') : route.push('/event')
      }
      else if(response.status === 400){
          alert(`${data['message']}`)
      }
      else{
        alert('Something went wrong')
      }
  }
  
  return (
    <main className="flex min-h-screen w-full items-center justify-center p-5">
      <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl'>
        <div className='flex flex-col overflow-y-auto md:flex-row'>
          {/* image side  */}
          <div className='overflow-hidden h-30 md:h-auto md:w-1/2 relative object-contain'>
            <Image className='absolute h-30 md:h-auto md:w-1/2' src='/login.png' alt='login' fill={true}/>
          </div>
          {/* login form side  */}
          <div className='w-full p-5 md:w-1/2 md:p-24 rounded-2xl md:rounded-0 flex flex-col'>
            <h1 className='mb-4 text-xl font-semibold text-gray-700 uppercase'>Login</h1>
            <form className='mt-10 flex flex-col space-y-5' onSubmit={(e)=>login(e)}>
              <label className="block text-sm">
                <span className="text-gray-700">Email</span>
                <input                  
                  name='email'
                  className="auth-input"
                  placeholder="yourmail@mail.com"
                />
              </label>
              <label className="block mt-4 text-sm">
                <span className="text-gray-700">Password</span>
                <input
                  name='password'
                  className="auth-input"
                  placeholder="***************"
                  type="password"
                />
              </label>
              <button type='submit' className='w-full button'>Sign In</button>
            </form>
            <hr className="my-8" />
            <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline" href="">
                  Forgot your password?
                </Link>
            </p>
            <p className="mt-1">
              <Link
                className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
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

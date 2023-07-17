import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Event | Create account',
  description: 'Register your new to get access',
}

export default function Register() {
    
  return (
    <main className="flex min-h-screen w-full items-center justify-center p-5">
      <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl'>
        <div className='flex flex-col overflow-y-auto md:flex-row'>
          {/* image side  */}
          <div className='overflow-hidden h-30 md:h-auto md:w-1/2 relative object-fit'>
            <Image className='absolute' src='/login.png' fill={true}/>
          </div>
          {/* login form side  */}
          <div className='w-full p-5 md:w-1/2 md:p-24 rounded-2xl md:rounded-0 flex flex-col'>
            <h1 className='mb-4 text-xl font-semibold text-gray-700 uppercase'>Register</h1>
            <form className='mt-10 flex flex-col space-y-5'>
            <label class="block text-sm">
                <span class="text-gray-700">Full name</span>
                <input
                  class="auth-input"
                  placeholder="Jane Doe"
                />
              </label>
              <label class="block text-sm">
                <span class="text-gray-700">Email</span>
                <input
                  class="auth-input"
                  placeholder="example@mail.com"
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
              <button className='w-full button'>Create account</button>
            </form>
            <hr class="my-8" />
            <p>
                <Link
                  class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline" href="/">
                  Alread with an existing account?
                </Link>
            </p>
          </div>
        </div>
      </div>
      
    </main>
  )
}

import Link from 'next/link'
import { login } from './actions'

export default function LoginPage() {
  return (
    <form className='container w-50 m-5'>
      <label className='flex' htmlFor="email">Email:</label>
      <input className='border-2' id="email" placeholder='Ex. Dustin Shaw' name="email" type="email" required />
      <label className='flex' htmlFor="password">Password:</label>
      <input className='border-2' id="password" placeholder='*******' name="password" type="password" required />
      <button className='flex p-2 mt-2 border-2' formAction={login}>Log in</button>
      <p>Not registered? then sign up</p>
      <button className='flex p-2 mt-2 border-2'>
        <Link href='/signup'>Sign up</Link>
      </button>
    </form>
  )
}
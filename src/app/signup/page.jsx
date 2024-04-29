import { signup } from "./actions";

export default function SignUp() {
  return (
    <form className='container w-50 m-5'>
      <label className='flex' htmlFor="email">Email:</label>
      <input className="border-black border-2" id="email" placeholder='Ex. Dustin Shaw' name="email" type="email" required />
      <label className='flex' htmlFor="password">Password:</label>
      <input className="border-black border-2" id="password" placeholder='*******' name="password" type="password" required />
      <button className='flex p-2 mt-2 border-2' formAction={signup}>Sign up</button>
    </form>
  )
}
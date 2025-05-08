import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  return (
    <>
<div class="bg-slate-300 flex justify-center items-center h-screen overflow-hidden">
    {/*  Left: Image  */}
<div class="w-1/2 h-screen hidden lg:block">
  <img src="https://images.unsplash.com/photo-1733503711063-3427bff34612?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Placeholder Image" class="object-cover w-full h-full"  />
</div>
{/*  Right: Login Form  */}
<div class= "lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
  <h1 class="text-2xl font-semibold mb-4">Login</h1>
  <form action="#" method="POST">
    {/* <!-- Username Input --> */}
    <div class="mb-4 bg-slate-300 " >
      <label for="username" class="block text-gray-600">Username</label>
      <input type="text" id="username" name="username" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" />
    </div>
    {/* <!-- Password Input --> */}
    <div class="mb-4">
      <label for="password" class="block text-gray-800">Password</label>
      <input type="password" id="password" name="password" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" />
    </div>
    {/* <!-- Remember Me Checkbox --> */}
    <div class="mb-4 flex items-center">
      <input type="checkbox" id="remember" name="remember" class="text-red-500" />
      <label for="remember" class="text-green-900 ml-2">Remember Me</label>
    </div>
    {/* <!-- Forgot Password Link --> */}
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Forgot Password?</a>
    </div>
    {/* <!-- Login Button --> */}
    <button type="submit" class="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
  </form>
  {/* <!-- Sign up  Link --> */}
  <div class="mt-6 text-green-500 text-center">
    <Link href="#" class="hover:underline">Sign up Here</Link>
  </div>
</div>
</div>
    
    
    
    </>
  )
}

export default Login
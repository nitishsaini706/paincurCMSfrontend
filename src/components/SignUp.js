import React from 'react';
import { Link } from "react-router-dom";


const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#131319]">
<div className="flex  text-white w-[80px] mb-[50px] "> 
<div>
  <img src="/logo.png" className='w-20 h-20'></img>
  </div>  
  </div>
<div className="bg-[#27292D] border-2 border-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        
          <h2 className="text-gray-400 text-center text-md mb-1">SIGN UP</h2>
        <h3 className="text-white  text-center text-2xl mb-6">Create an account to continue</h3>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white text-sm mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2.5 bg-[#27292D] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white text-sm mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-2.5 bg-[#27292D] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Choose a preferred username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white text-sm mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2.5 bg-[#27292D] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Choose a strong password"
            />
          </div>
          <Link to="/feed">
          <button
            
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded focus:outline-none focus:bg-blue-600"
          >
            Continue
          </button>
          </Link>
        </form>
        <div className="text-gray-400 text-start mt-4" >
          Already have an account? <a href="#" className="text-gray-200">Login  →</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
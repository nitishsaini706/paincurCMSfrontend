import React,{useState} from 'react'

const LoginPage = ()=> {
  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#131319]">
<div className="flex  text-white w-[80px] mb-[50px] ">
  <div>
  <img src="/logo.png" className='w-20 h-20'></img>
  </div>
</div>
<div className="bg-[#27292D] border-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-center mb-4">
          <div className="flex justify-center items-center bg-gray-900">
      
    </div>
        </div>
        <h2 className="text-gray-400 text-center text-md mb-1">WELCOME BACK</h2>
        <h3 className="text-white  text-center text-2xl mb-6">Log into your account</h3>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-200 text-sm mb-2">Email or Username</label>
            <input
              type="text"
              id="email"
              className="w-full p-2.5 bg-[#27292D] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email or username"
            />
          </div>
          <div className="mb-4">
            <div className='flex justify-between mb-1'>
                
            <label htmlFor="password" className="block text-gray-200 text-sm ">Password</label>
            <div className="text-right ">
              <a href="#" className="text-sm text-gray-200 ">Forgot password?</a>
            </div>
            </div>
            <input
              type="password"
              id="password"
              className="w-full p-2.5 bg-[#27292D] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
             

          </div>
          <button
            // onClick={()=>setShowLogin(false)}
            className="w-full bg-[#4A96FF] hover:bg-blue-600 text-white  py-2.5 rounded focus:outline-none focus:bg-blue-600"
          >
            Login now
          </button>
        </form>
        <div className="text-gray-400 text-start mt-4 flex" >
          Not registered yet? <a href="#" className="text-gray-200 mr-1">Register →</a>
        </div>
      </div>
</div>
  );
}

export default LoginPage;
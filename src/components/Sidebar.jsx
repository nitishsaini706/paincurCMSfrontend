// Sidebar.js
import React from 'react';
import { BsBox } from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className="p-3 mx-[10px] w-64 h-screen bg-gray-200 text-black">
        
      <div className="p-4 flex">
        <img src="/logo.png" className='w-7'></img>
        <h1 className='text-2xl ml-2'>paincure.Ai</h1>
      </div>
      <div className='flex justify-between p-4'>
        <h2 className='text-lg'>logged In</h2>
        <h2 className='text-xl font-bold'>Hiren</h2>
      </div>
      <div className='mt-5 border-t-2 border-black pt-10'>
        <div className='flex items-center mb-2'>

      <BsBox />

        <p className='ml-3 text-lg'>Blogs</p>
        </div>
        <div className='flex items-center'>

      <BsBox />

      <p className='ml-3 text-lg'>Add Blogs</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

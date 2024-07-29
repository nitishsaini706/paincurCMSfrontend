// Sidebar.js
import React,{ useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { BsBox } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="p-3 mx-[10px] w-64 h-screen bg-gray-200 text-black">
        
      <div className="p-4 flex justify-center items-center">
        <img src="/logo.png" className='w-10'></img>
        <h1 className='text-2xl ml-2'>paincure.Ai</h1>
      </div>
      <div className='flex justify-between p-2'>
        <h2 className='text-lg'>Logged In</h2>
        <h2 className='text-xl font-bold'>{user}</h2>
      </div>
      <div className='mt-2 border-t-2 border-black pt-10'>
        <div className='flex items-center'>
 <BsBox />
        <Link to='/blogs' className='ml-3 text-lg no-underline text-black mb-2' >Blogs</Link>
        </div>
        <div className='flex items-center'>
      <BsBox />

      <Link to='/add-blogs' className='ml-3 text-lg no-underline text-black'>Add Blogs</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

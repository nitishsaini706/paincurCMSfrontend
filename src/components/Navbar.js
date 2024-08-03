import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { BsArrowDownShort } from "react-icons/bs";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="sticky top-0 bg-white shadow-md py-2 pl-2 pr-4 flex justify-between items-center">
      {/* <div className="flex items-center space-x-4">
        <button className="text-gray-600">
          <FaSearch size={20} />
        </button>
        <input 
          type="text" 
          placeholder="Search Here" 
          className="px-4 py-2 bg-gray-200 rounded-full focus:outline-none"
        />
      </div> */}
      <div className="p-4 flex justify-center items-center ">
        <img src="/logo.png" className='w-10'></img>
        <h1 className='text-2xl ml-2'>paincure.Ai</h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* <span className="text-gray-600">EN</span> */}
        {/* <button className="text-gray-600">
          <FaBell size={20} />
        </button>
        <button className="text-gray-600">
          <FaEnvelope size={20} />
        </button> */}
        {user ? (
          <div className="flex items-center space-x-4 mr-10">
            <div className='flex items-center justify-beteween border-1 mx-2 px-4 py-1'>

            <img
              src={user.image}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <span className="text-gray-600 text-xl font-bold ml-2">{user.name}</span>
            </div>
            <div>

            <button
              onClick={logout}
              className="w-full text-left bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Logout
            </button>
          </div>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Signup
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

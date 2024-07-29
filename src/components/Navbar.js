import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/tasks">
         <h1 className='text-white text-3xl'>CMS  <img src="/logo.png" className='w-10'></img></h1>
        </Link>
      </div>
      <div>
   
          <>
            <Link to="/login">
              <button className="bg-white text-blue-600 px-4 py-2 rounded mr-2">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-white text-blue-600 px-4 py-2 rounded">
                Signup
              </button>
            </Link>
          </>
        
      </div>
    </nav>
  );
};

export default Navbar;

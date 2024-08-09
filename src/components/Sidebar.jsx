import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CiGrid31, CiCalendarDate, CiHospital1, CiViewTimeline, CiViewTable, CiYoutube, CiSettings } from "react-icons/ci";

const Sidebar = () => {
  const location = useLocation();

  const linkClass = (path) => {
    return location.pathname === path ? 'p-2 text-lg no-underline text-white bg-blue-600 font-bold rounded-2xl' : 'ml-3 text-lg no-underline text-black';
  };
  const linktext = (path) => {
    return location.pathname === path ? 'text-white' : 'text-black';
  };

  return (
    <div className="p-3 mx-[10px] w-64 h-screen  border-2">
      <div className='pt-2'>
        <div className={`${linkClass('/dashboard')} flex items-center mb-4`}>
          <CiGrid31 size="21"/>
          <Link to='/404' className={`${linktext('/dashboard')} no-underline ml-2`}>Dashboard</Link>
        </div>
        <div className={`${linkClass('/add-pain-program')} flex items-center mb-4`}>
          <CiYoutube size="21"/>
          <Link to='/404' className={`${linktext('/add-pain-program')} no-underline ml-2`}>Create Pain Program</Link>
        </div>
        <div className={`${linkClass('/pains')} flex items-center mb-4`}>
          <CiViewTimeline size="21"/>
          <Link to='/404' className={`${linktext('/pains')} no-underline ml-2`}>List Pain Programs</Link>
        </div>
        <div className={`${linkClass('/patients')} flex items-center mb-4`}>
          <CiHospital1 size="21"/>
          <Link to='/404' className={`${linktext('/patients')} no-underline ml-2`}>Patients</Link>
        </div>
        <div className={`${linkClass('/appointments')} flex items-center mb-4`}>
          <CiCalendarDate size="21"/>
          <Link to='/404' className={`${linktext('/appointments')} no-underline ml-2`}>Appointments</Link>
        </div>
        <div className={`${linkClass('/settings')} flex items-center mb-4`}>
        <div className={`${linkClass('/add-blog')} flex items-center mb-4`}>
          <CiViewTimeline size="21"/>
          <Link to='/add-blog' className={`${linktext('/add-blog')} no-underline ml-2`}>Add Blogs</Link>
        </div>
        <div className={`${linkClass('/blogs')} flex items-center mb-4`}>
          <CiViewTable size="21"/>
          <Link to='/blogs' className={`${linktext('/blogs')} no-underline ml-2`}>Blogs</Link>
        </div>
        <div className={`${linkClass('/blogs')} flex items-center mb-4`}>
          <CiViewTable size="21"/>
          <Link to='/leads' className={`${linktext('/Leads')} no-underline ml-2`}>Leads</Link>
        </div>
          <CiSettings size="21"/>
          <Link to='/404' className={`${linktext('/settings')} no-underline ml-2`}>Settings</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

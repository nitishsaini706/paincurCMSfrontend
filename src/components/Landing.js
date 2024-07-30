// MainContent.js
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { getBlogs,deleteBlogs,getBlogsByTitle } from '../Utils/api';
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import {  useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"
import { AiOutlineLink } from "react-icons/ai";

const MainContent = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState("");
  const history = useNavigate();

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await getBlogs();
      if (response && response.data && response.data.blogs) {
        setBlogs(response.data.blogs);
      }
    }
    fetchData();
  }, []);

  const editBlog = (data) => {

    history('/edit-blog/'+data.slug)
  }

  const deleteBlog = async (e) => {
    try{

      const response = await deleteBlogs(e.slug);
      console.log('response', response)
      if(response && response.status == 200){
        toast.success("Blog deleted successfully")
      }
    }catch(e){
      toast.error("Deletion failed",e);
      console.error("Error while deleting blog",e)
    }
  }

  const search = async()=>{
    if(title === ""){
      toast.error("Title cannot be empty");
      return;
    }
    const res = await getBlogsByTitle(title);
    if(res && res.data.status === 200){
      setBlogs(res.data.blog)
    }
  }
  return (
    <div>
      <Navbar />


      <div className='flex'>
        <Sidebar />

        <div className=" p-6 mx-5 w-[70%]">

          <div className="mt-4">
            <div className='flex mb-4'>
              <input type="text" placeholder="Search Blog" className="p-2 mr-3 border border-gray-300 rounded w-[85%] " />
              <button className='bg-blue-500 text-white px-3 py-2 rounded-2xl hover:bg-blue-700' onClick={search}>Search</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2">Title</th>
                    <th className="p-2">Link</th>
                    <th className="p-2">Service</th>
                    <th className="p-2">Creation Date</th>
                    <th className="p-2">Edit</th>
                    <th className="p-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.length > 0 ? (
                    blogs.map((data) => (
                      <tr key={data.slug} >
                        <td className='w-[100px] h-[100px] p-1'><img src={data.image} alt="" /></td>
                        <td className='text-wrap w-[150px] ml-2'>{data.title}</td>
                        <td ><a href={`/${data.slug}`}><AiOutlineLink /></a></td>
                        <td >{data.service}</td>
                        <td >{new Date(data.creation_time).toLocaleString()}</td>
                        <td ><AiFillEdit className='hover:cursor-pointer' onClick={()=>editBlog(data)} /></td>
                        <td ><AiOutlineDelete className='hover:cursor-pointer' onClick={()=>deleteBlog(data)} /></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No Blogs Present</td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;

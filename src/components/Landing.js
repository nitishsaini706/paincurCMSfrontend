// MainContent.js
import React from 'react';

const MainContent = () => {
  return (
    <div className="flex p-6 mx-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">News</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Reset Filter</button>
      </div>
      <div className="mt-4">
        <input type="text" placeholder="Search News" className="p-2 border border-gray-300 rounded w-full mb-4"/>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Image</th>
                <th className="p-2">Title</th>
                <th className="p-2">Perma Link</th>
                <th className="p-2">Type</th>
                <th className="p-2">Published Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Add rows here */}
              <tr>
                <td className="p-2"><img src="thumb_image_url" alt="Thumb" /></td>
                <td className="p-2">Rajeev Ram to Shanti Pereira...</td>
                <td className="p-2"><a href="#">Link</a></td>
                <td className="p-2">SportsTak</td>
                <td className="p-2">Thu, 25 Jul 11:48 AM</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainContent;

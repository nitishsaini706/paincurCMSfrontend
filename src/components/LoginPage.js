import React, { useState,useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const history = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = 'Email or Username is required';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        setLoading(true);
        const response = await login(formData)
        console.log('Form data submitted:', response.data);
        if(response == true){
          history('/blogs');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error
      } finally {
        setLoading(false);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#131319]">
      <div className="flex text-white w-[80px] mb-[50px]">
        <div>
          <img src="/logo.png" className="w-20 h-20" alt="logo" />
        </div>
      </div>
      <div className="bg-[#27292D] border-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-center mb-4">
          <div className="flex justify-center items-center bg-gray-900"></div>
        </div>
        <h2 className="text-gray-400 text-center text-md mb-1">WELCOME BACK</h2>
        <h3 className="text-white text-center text-2xl mb-6">Log into your account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-200 text-sm mb-2">Email or Username</label>
            <input
              type="text"
              id="email"
              className="w-full p-2.5 bg-[#27292D] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email or username"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
          </div>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <label htmlFor="password" className="block text-gray-200 text-sm">Password</label>
              <div className="text-right">
                <a href="#" className="text-sm text-gray-200">Forgot password?</a>
              </div>
            </div>
            <input
              type="password"
              id="password"
              className="w-full p-2.5 bg-[#27292D] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-[#4A96FF] hover:bg-blue-600 text-white py-2.5 rounded focus:outline-none focus:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login now'}
          </button>
        </form>
        <div className="text-gray-400 text-start mt-4 flex">
          Not registered yet? <Link to='/signup' className="text-gray-200 ml-1">Register →</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

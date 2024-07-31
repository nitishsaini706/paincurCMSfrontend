import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

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
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.username) {
      errors.username = 'Username is required';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        setLoading(true);
        const response = await signup(formData);
        console.log('Sign-up successful:', response);
        if (response && response.data && response.data.status === 200) {
          navigate('/login');
          toast.success('Sign-up successful:');
        }
      } catch (error) {
        console.error('Error signing up:', error);
        toast.error('Error signing up:'+error.response.data.message);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please fix the errors in the form.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#131319]">
      <div className="flex text-white w-[80px] mb-[50px]">
        <div>
          <img src="/logo.png" className='w-20 h-20' alt="logo" />
        </div>
      </div>
      <div className="bg-[#27292D] border-2 border-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-gray-400 text-center text-md mb-1">SIGN UP</h2>
        <h3 className="text-white text-center text-2xl mb-6">Create an account to continue</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white text-sm mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2.5 bg-[#27292D] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white text-sm mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-2.5 bg-[#27292D] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Choose a preferred username"
              value={formData.username}
              onChange={handleChange}
            />
            {formErrors.username && <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-white text-sm mb-2">Phone Number</label>
            <input
              type="text"
              id="phone"
              className="w-full p-2.5 bg-[#27292D] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Choose a preferred phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white text-sm mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2.5 bg-[#27292D] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Choose a strong password"
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-white text-sm mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-2.5 bg-[#27292D] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {formErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded focus:outline-none focus:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Continue'}
          </button>
        </form>
        <div className="text-gray-400 text-start mt-4">
          Already have an account? <Link to="/login" className="text-gray-200">Login →</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import axiosInstance from "./axiosInstance";


export const registerUser = (userData) => axiosInstance.post('/api/auth/signup', userData);
export const loginUser = (userData) => axiosInstance.post('/api/auth/login', userData);
export const getBlogs = () => axiosInstance.get('/api/blogs/');
export const uploadImage = (file) => {
   console.log(file)
    return axiosInstance.post('/api/upload', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
export const createBlog = (blogs) => axiosInstance.post(`/api/blogs/`, blogs);
export const deleteTask = (id) => axiosInstance.delete(`/tasks/${id}`);

export default axiosInstance

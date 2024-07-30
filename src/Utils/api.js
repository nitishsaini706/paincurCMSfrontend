import axiosInstance from "./axiosInstance";


export const registerUser = (userData) => axiosInstance.post('/api/auth/signup', userData);
export const loginUser = (userData) => axiosInstance.post('/api/auth/login', userData);
export const getBlogs = () => axiosInstance.get('/api/blogs/');
export const getBlogsByTitle = (title) => axiosInstance.post('/api/blogs/title',title);
export const getBlogBySlug = (slug) => axiosInstance.get('/api/blogs/'+slug);
export const uploadImage = (file) => {
   console.log(file)
    return axiosInstance.post('/api/upload', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
export const updateBlog = (slug,blogs) => axiosInstance.put(`/api/blogs/${slug}`, blogs);
export const createBlog = (blogs) => axiosInstance.post(`/api/blogs/`, blogs);
export const deleteBlogs = (id) => axiosInstance.delete(`/api/blogs/${id}`);

export default axiosInstance

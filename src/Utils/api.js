import axiosInstance from "./axiosInstance";


export const registerUser = (userData) => axiosInstance.post('/api/auth/register', userData);
export const loginUser = (userData) => axiosInstance.post('/api/auth/login', userData);
export const getTasks = () => axiosInstance.get('/tasks');
export const uploadImage = (taskData) => axiosInstance.post('/api/upload', taskData);
export const createBlog = (id, taskData) => axiosInstance.put(`/tasks/${id}`, taskData);
export const deleteTask = (id) => axiosInstance.delete(`/tasks/${id}`);

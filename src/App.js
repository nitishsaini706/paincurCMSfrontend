import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Addblog from './components/Addblog';
import EditBlog from './components/EditBlog';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import PrivateRoute from './Utils/PrivateRoutes';
import { AuthProvider } from './Context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/blogs' element={<PrivateRoute><Landing /></PrivateRoute>} />
          <Route path='/add-blog' element={<PrivateRoute><Addblog /></PrivateRoute>} />
          <Route path='/edit-blog/:slug' element={<PrivateRoute><EditBlog /></PrivateRoute>} />
        </Routes>
      </Router>
      <ToastContainer /> 
    </AuthProvider>
  );
}

export default App;

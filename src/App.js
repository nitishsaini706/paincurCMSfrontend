import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Components/Landing';
import Addblog from './Components/Addblog';
import LoginPage from './Components/LoginPage';
import SignUp from './Components/SignUp';
import PrivateRoute from './Utils/PrivateRoutes';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <AuthProvider>
  <Router>
  <Routes>
  <Route path='/' element={<LoginPage />}></Route>
  <Route path='/login' element={<LoginPage />}></Route>
  <Route path='/signup' element={<SignUp />}></Route>
  <Route path='/blogs' element={<PrivateRoute> <Landing /></PrivateRoute>}></Route>
  <Route path='/add-blogs' element={<Addblog />} ></Route>
  </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;

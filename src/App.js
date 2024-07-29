import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Components/Landing';
import Addblog from './Components/Addblog';
import LoginPage from './Components/LoginPage';
import SignUp from './Components/SignUp';

function App() {
  return (
  <Router>
  <Routes>
  <Route path='/login' element={<LoginPage />}></Route>
  <Route path='/signup' element={<SignUp />}></Route>
  <Route path='/' element={<Landing />}></Route>
  <Route path='/add-blogs' element={<Addblog />} ></Route>
  </Routes>
    </Router>
  );
}

export default App;

import './App.css';
import Sidebar from './components/Sidebar';
import Landing from './components/Landing';

function App() {
  return (
    <div className='flex'>
      <Sidebar />
      <Landing />
    </div>
  );
}

export default App;

import './App.css';
import Signup from './components/Signup';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>} />
      </Routes>
      
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Profile from './Profile';
import Accommodation from './Accommodation';
// import { IconName } from "react-icons/sl";
import About from './About';
import Contact from './Contact';
import Nav from './components/Nav';
import Footer from './components/Footer';
import HamNav from './components/HamNav';
// import Booking from './components/Booking';
import LoginSignup from './components/LoginSignup/LoginSignup';

function App() {
  return (
    <Router>
      <div className="App">
        <div id='nav'>
          <Nav/>
        </div>
        {/* <Booking/> */}
        <div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="LoginSignup" element={<LoginSignup/>} />
            <Route path="Profile" element={<Profile/>}/>
            <Route path="Accommodation" element={<Accommodation/>}/>
            <Route path="About" element={<About/>}/>
            <Route path="Contact" element={<Contact/>}/>
            <Route path="HamNav" element={<HamNav/>}/>
            
          </Routes>
        </div>
        <footer>
          <Footer/>
        </footer>
      </div>
    </Router>
  );
}

export default App;

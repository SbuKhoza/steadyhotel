// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Accommodation from './pages/Accommodation';
import About from './pages/About';
import Contact from './pages/Contact';
import Nav from './components/Nav';
import Footer from './components/Footer';
import LoginSignup from './components/LoginSignup/LoginSignup';
import BookingForm from './components/booking/BookingForm';
import PaymentPage from './components/PaymentPage';
import AdminDashboard from './admin/AdminDashboard'; // Admin Dashboard

function App() {
  return (
    <Router>
      <div className="App">
        <div id='nav'>
          <Nav/>
        </div>
        
        <div>
          <Routes>
            {/* User-Facing Routes */}
            <Route path="/" element={<Home/>} />
            <Route path="/LoginSignup" element={<LoginSignup/>} />
            <Route path="/Profile" element={<Profile/>}/>
            <Route path="/Accommodation" element={<Accommodation/>}/>
            <Route path="/About" element={<About/>}/>
            <Route path="/Contact" element={<Contact/>}/>
            <Route path="/BookingForm" element={<BookingForm/>}/>
            <Route path="/Payment" element={<PaymentPage/>} />
            
            {/* Admin-Facing Route */}
            <Route path="/admin" element={<AdminDashboard/>} />
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

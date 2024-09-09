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
import BookingForm from './components/BookingForm/BookingForm'
import Payment from './components/payment/Payment'
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminLogin from './components';

function App() {
  return (
    <Router>
      <div className="App">
        <div id='nav'>
          <Nav/>
        </div>

        <div>
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Home/>} />
            <Route path="LoginSignup" element={<LoginSignup/>} />
            <Route path="Profile" element={<Profile/>}/>
            <Route path="Accommodation" element={<Accommodation/>}/>
            <Route path="About" element={<About/>}/>
            <Route path="Contact" element={<Contact/>}/>
            <Route path="BookingForm" element={<BookingForm/>}/>
            <Route path="Payment" element={<Payment/>} />

            {/* Admin Routes */}
            <Route path="admin/login" element={<AdminLogin/>} />
            <Route path="admin/dashboard" element={<AdminDashboard/>} />
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
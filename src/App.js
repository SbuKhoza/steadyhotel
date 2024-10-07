import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm/BookingForm'
import AdminLogin from './Admin/AdminLogin';
import LoginSignup from './components/LoginSignup/LoginSignup';
import PaymentPage from './pages/payment/PaymentPage';

function App() {
  return (
    <Router>
      <div className="App">
        <div id='nav'>
          <NavBar/>
        </div>

        <div>
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Home/>} />
            <Route path="LoginSignup" element={<LoginSignup/>} />
            <Route path="Profile" element={<Profile/>}/>
            <Route path="About" element={<About/>}/>
            <Route path="Contact" element={<Contact/>}/>
            <Route path="BookingForm" element={<BookingForm/>}/> 
            <Route path="payment" element={<PaymentPage />} />

            
            <Route path="admin/login" element={<AdminLogin/>} />
            {/* <Route path="admin/dashboard" element={<AdminDashboard/>} /> */}
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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Profile from './Profile';
import Accommodation from './Accommodation';
import About from './About';
import Contact from './Contact'
import Nav from './comonents/Nav';
import Footer from './comonents/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <div id='nav'>
        <Nav/>
        </div>

        <Booking/>

        
        <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="Profile" element={<Profile/>}/>
          <Route path="Accommodation" element={<Accommodation/>}/>
          <Route path="ABout" element={<About/>}/>
          <Route path="Contact" element={<Contact/>}/>
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

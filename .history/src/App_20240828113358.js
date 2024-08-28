import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Profile from './Profile';
import Accommodation from './Accommodation';
import About from './About';
import Contact from './Contact'
import Nav from './comonents/Nav';

function App() {
  return (
    <Router>
      <div className="App">
        <div id='nav'>
        <Nav/>
        </div>

        
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
          <p>© 2022 Steady Hotel. All rights reserved.</p>  {/* replace with your own copyright notice */}  {/* add links to your social media accounts */}  {/* add links to your terms and conditions */}  {/* add links to your privacy policy */}  {/* add links to your contact form */}  {/* add links to your FAQ */}  {/* add links to your blog */}  {/* add links to your partnership opportunities */}  {/* add links to your careers */}  {/* add links to your customer support */}  {/* add links to your press releases */}  {/* add links to your press kit */}  {/* add links to your press gallery */}  {/* add links to your press relations */}  {/* add links to your press calendar */}  {/* add links to your press releases archive */}  {/* add links to your press releases blog */}  {/* add links to your press releases videos */}  {/* add links to your press releases podcasts */}
        </footer>
      </div>
    </Router>
  );
}

export default App;

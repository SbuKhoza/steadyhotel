import './Components.css';
import React from 'react'
import "@fontsource/righteous"; 
// import "@fontsource/righteous/400.css"; 
// import "@fontsource/righteous/400-italic.css";

function HamNav() {
    return (
        <nav>
            <h1 id='logo'>Steady</h1>
            <div className='menu'>
                <ul>
                    <a href='/'>Home</a>
                    <a href='Accommodation'>Accommodation</a>
                    <a href='About'>About Us</a>
                    <a href='Contact'>Contact</a>
                    
                </ul>

            </div>

            <div className='profile'>
                <a href='Profile'>Profile</a>
                <a href='LoginSignup'>Login/Signup</a>    
            </div>
        </nav>
    )
}

export default HamNav

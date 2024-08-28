import './Components.css';
import React from 'react'

function Nav() {
    return (
        <nav>
            <h1 id='logo'>STEADY</h1>
            <div className='menu'>
                <ul>
                    <a href='/'>Home</a>
                    <a href='Accommodation'>Accommodation</a>
                    <a href='About'>About Us</a>
                    <a href='Contact'>Contact</a>
                    
                </ul>

            </div>
        </nav>
    )
}

export default Nav

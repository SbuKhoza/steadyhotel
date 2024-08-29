import React from 'react'
import './LoginSignup.css';

 function LoginSignup() {
  return (
    <div className='logsign'>
        <div className='signhearder'>
            <div className='text'>
                <h2>Sign Up or Login</h2>
            </div>
            <div className='underline'></div>
        </div>

        <div className='inputs'>
            <div className='name'> 
                <label htmlFor='name'>Name: </label><br/>
                <input type='text' placeholder='Enter your Name'></input>
            </div>
        </div>

        <div className='inputs'>
            <div className='username'> 
                <label htmlFor='name'>Name: </label><br/>
                <input type='text' placeholder='Enter your Name'></input>
            </div>
        </div>
    
    
    
    </div>
  )
}

export default LoginSignup;

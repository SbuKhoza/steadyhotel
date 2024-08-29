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
                <input type='text' placeholder='Sbuda Malloya'></input>
            </div>
        </div>

        <div className='inputs'>
            <div className='username'> 
                <label htmlFor='username'>User Name: </label><br/>
                <input type='text' placeholder='Malloya'></input>
            </div>
        </div>

        <div className='inputs'>
            <div className='email'> 
                <label htmlFor='name'>Email: </label><br/>
                <input type='text' placeholder='sbuda@mail.com'></input>
            </div>
        </div>

        <div className='inputs'>
            <div className='pass'> 
                <label htmlFor='password'>Name: </label><br/>
                <input type='email' placeholder='Enter your Email'></input>
            </div>
        </div>
    
    
    
    </div>
  )
}

export default LoginSignup;

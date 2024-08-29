import React from 'react'
import './LoginSignup.css';

 function LoginSignup() {
  return (
    <div className='logsigncont'>
    <div className='logimg'>
        
    </div>
    <div className='logsign'>
        <div className='signhearder'>
            <div className='headtext'>
                <h2>Sign Up </h2>
            </div>
            <div className='underline'></div>
        </div>

        <div className='inputs'>
            <div className='fname'> 
                <label htmlFor='name'>Name: </label><br/>
                <input type='text' placeholder='Sbuda Malloya'></input>
            </div>
        </div>

        <div className='inputs'>
            <div className='uname'> 
                <label htmlFor='username'>User Name: </label><br/>
                <input type='text' placeholder='Malloya'></input>
            </div>
        </div>

        <div className='inputs'>
            <div className='mail'> 
                <label htmlFor='name'>Email: </label><br/>
                <input type='text' placeholder='sbuda@mail.com'></input>
            </div>
        </div>

        <div className='inputs'>
            <div className='pass'> 
                <label htmlFor='password'>Name: </label><br/>
                <input type='password' placeholder='p@**s***5'></input>
            </div>
        </div>

        <div className='inputs'>
            <div className='confpass'> 
                <label htmlFor='password'>Name: </label><br/>
                <input type='password' placeholder='p@**s***5'></input>
            </div>
        </div>

        <div className='submitcont'>
            <div className='lostpass'>Lost password? <span>Click here!</span></div>
            <div className='submit'>Sign up</div>
            <div className='submit'>Login</div>
        </div>
    
    
    
    </div>

    </div>
  )
}

export default LoginSignup;

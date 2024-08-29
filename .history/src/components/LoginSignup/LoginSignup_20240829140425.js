import React, { useState } from 'react';
import './LoginSignup.css';

function LoginSignup() {
  const [action, setAction] = useState('Signup');

  return (
    <div className='containersign'>
      <div className='logsigncont'>
        <div className='logimg'>
          <img src='login1.jpg' alt='login' />
        </div>

        <div className='logsign'>
          <div className='signheader'>
            <div className='headtext'>
              <h2>{action === 'Signup' ? 'Sign Up' : 'Login'}</h2>
            </div>
            <div className='text'></div>
            <div className='underline'></div>
          </div>

          {action === 'Signup' && (
            <>
              <div className='inputs'>
                <div className='fname'> 
                  <label htmlFor='name'>Name: </label><br/>
                  <input type='text' placeholder='Sbuda Malloya' />
                </div>
              </div>
              <div className='inputs'>
                <div className='mail'> 
                  <label htmlFor='email'>Email: </label><br/>
                  <input type='email' placeholder='sbuda@mail.com' />
                </div>
              </div>
            </>
          )}

          <div className='inputs'>
            <div className='uname'> 
              <label htmlFor='username'>User Name: </label><br/>
              <input type='text' placeholder='Malloya' />
            </div>
          </div>

          <div className='inputs'>
            <div className='pass'> 
              <label htmlFor='password'>Password: </label><br/>
              <input type='password' placeholder='p@**s***5' />
            </div>
          </div>

          {action === 'Signup' && (
            <div className='inputs'>
              <div className='confpass'> 
                <label htmlFor='confirm-password'>Confirm Password: </label><br/>
                <input type='password' placeholder='p@**s***5' />
              </div>
            </div>
          )}

          <div className='lostpass'>
            Lost password? <span>Click here!</span>
          </div>

          <div className='submitcont'>
            <div className='submit' onClick={() => setAction('Signup')}>Sign up</div>
            <div className='submit' onClick={() => setAction('Login')}>Login</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;

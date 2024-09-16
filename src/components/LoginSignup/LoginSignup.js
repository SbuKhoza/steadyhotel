import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './LoginSignup.css';

function LoginSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [action, setAction] = useState('Signup');
  const dispatch = useDispatch();
  const { error, loading } = useSelector(state => state.user);

  const handleSubmit = () => {
    if (action === 'Signup') {
      // Placeholder for signup logic
      console.log('Signup:', { email, password });
    } else {
      // Placeholder for login logic
      console.log('Login:', { email, password });
    }
  };

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

          <div className='inputs'>
            <div className='mail'> 
              <label htmlFor='email'>Email: </label><br/>
              <input 
                type='email' 
                placeholder='sbuda@mail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          </div>

          <div className='inputs'>
            <div className='pass'> 
              <label htmlFor='password'>Password: </label><br/>
              <input 
                type='password' 
                placeholder='p@**s***5'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <div className='error'>{error}</div>}

          <div className='lostpass'>
            Lost password? <span>Click here!</span>
          </div>

          <div className='submitcont'>
            <div className='submit' onClick={handleSubmit}>{action}</div>
            <div className='submit' onClick={() => setAction(action === 'Signup' ? 'Login' : 'Signup')}>
              {action === 'Signup' ? 'Switch to Login' : 'Switch to Signup'}
            </div>
          </div>

          {loading && <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
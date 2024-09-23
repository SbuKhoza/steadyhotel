import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupUser, loginUser } from '../../redux/slices/userSlice';
import { Box, Button, TextField, Typography, Grid, Paper, CircularProgress } from '@mui/material';

function LoginSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState(''); // New state for display name
  const [action, setAction] = useState('Signup');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isLoggedIn } = useSelector(state => state.user);

  const handleSubmit = () => {
    if (action === 'Signup') {
      dispatch(signupUser({ email, password, displayName })); // Include display name in signup
    } else {
      dispatch(loginUser({ email, password }));
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/path-to-your-background-image.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={4}>
          <Paper elevation={6} sx={{ padding: 4, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <Typography variant="h4" align="center" gutterBottom>
              {action === 'Signup' ? 'Sign Up' : 'Login'}
            </Typography>

            <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
              {action === 'Signup' && (
                <TextField
                  label="Display Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              )}
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>

            {error && (
              <Typography color="error" align="center" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            <Box sx={{ mt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                {action}
              </Button>
              <Button
                fullWidth
                variant="text"
                color="secondary"
                onClick={() => setAction(action === 'Signup' ? 'Login' : 'Signup')}
                sx={{ mt: 2 }}
              >
                {action === 'Signup' ? 'Switch to Login' : 'Switch to Signup'}
              </Button>
            </Box>

            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <CircularProgress />
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginSignup;
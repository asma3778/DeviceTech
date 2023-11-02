import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';

import { AppDispatch } from '../../redux/store';
import { addUser, fetchUser } from '../../redux/slices/userSlice';

export const RegisterForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
    ban: false
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => {
      return { ...prevUser, [event.target.name]: event.target.value }
    })
  }
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const newUser = { id: new Date().getTime(), ...user }

    dispatch(fetchUser()).then(() => dispatch(addUser(newUser)))
    navigate('/login')
  }

  return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={3}
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form style={{ width: '100%', marginTop: '20px' }} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="Firstname"
                name="firstname"
                autoComplete="firstname"
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Lastname"
                name="lastname"
                autoComplete="lastname"
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email Address"
                type="email"
                id="email"
                autoComplete="email"
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
              >
                Register
              </Button>
            </form>
            <p style={{ marginTop: '20px', marginBottom: '20px' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ textDecoration: 'none' }}>
                Login
              </Link>
            </p>
          </Paper>
        </Container>
      </Box>
  );
};
import { ChangeEvent, useState, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Container, Paper, TextField, Typography} from '@mui/material'

import { UserSidebar } from "../../components/user/UserSidebar";
import { AppDispatch, RootState } from "../../redux/store";
import { updateUser } from "../../redux/slices/userSlice";

export const UserProfile = () =>{
    const dispatch = useDispatch<AppDispatch>()
    const {userData} = useSelector( (state: RootState) => state.userReducer)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [user, setUser] = useState({
        firstName: userData?.firstName,
        lastName: userData?.lastName
    })

    const handleFormOpen = ()=>{
        setIsFormOpen(!isFormOpen)
    }
    const handleChange =(event : ChangeEvent<HTMLInputElement>)=>{
        setUser((prevUser)=>{
            return {...prevUser, [event.target.name]: event.target.value}
        })
    }
    const handleSubmit = (event: FormEvent)=>{
        event.preventDefault()
        const updateUserData = {id: userData?.id, ...user};
        dispatch(updateUser(updateUserData))
    }

    return(
        <div>
        <UserSidebar />
        <div className="main-content"></div> 
        <div className="general-content">
        <Button type="submit" onClick={handleFormOpen}>Edit Profile</Button>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Container component="main" maxWidth="xs">
        {isFormOpen &&
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

            </Typography>
            <form style={{ width: '100%', marginTop: '20px' }} onChange={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                value={user.firstName} 
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                value={user.lastName} 
                onChange={handleChange}
              />
              <Button type='submit'>Update Profile</Button>
              </form>
          </Paper>
}
        </Container>
      </Box>
      {userData && (
            <div>
            <p>ID: {userData.id}</p>
            <p>Name: {`${userData.firstName}  ${userData.lastName}`}</p>
            <p>Email: {userData.email}</p>
            <p>Role: {userData.role}</p>
            </div>
        )}
        </div> 
    </div>
    )
};

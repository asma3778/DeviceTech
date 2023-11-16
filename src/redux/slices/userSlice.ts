import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../api'
import { User } from '../../types/types'

export type initialStateUser = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  userData: User | null
}

const initialState: initialStateUser = {
  users: [],
  error: null,
  isLoading: false, 
  isLoggedIn: false,
  userData: null
}
console.log(initialState)

export const fetchUser = createAsyncThunk("UserList/fetchUser", async () =>{ 
  try {
      const response = await api.get('/mock/e-commerce/users.json')

      if (!response) {
        throw new Error('Network response error');}
      return response;
    } catch (error) {
    console.log(error) 
    }
  })
  

  const data = localStorage.getItem("loginData") !== null ? JSON.parse(String(localStorage.getItem('loginData'))) : []

export const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    login : (state, action)=>{
      state.isLoggedIn= true;
      state.userData = action.payload
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    logout : (state)=>{
      state.isLoggedIn= false
      state.userData = null
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    updateUser : (state, action)=>{
      const {id, firstName, lastName}= action.payload
      const foundUser = state.users.find((user)=> user.id === id)
      if (foundUser){
        foundUser.firstName = firstName
        foundUser.lastName = lastName
        state.userData = foundUser
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLoggedIn: state.isLoggedIn,
            userData: state.userData
          })
        )
      }
    },
    usersRequest: (state) => {
      state.isLoading = true
    },
    usersSuccess: (state, action) => {
      state.isLoading = false
      state.users = action.payload
    },
    addUser: (state, action) => {
      state.users.push(action.payload)
    },
    removeUser: (state, action: { payload: { userId: number } }) => {
      const filteredItems = state.users.filter((user) => user.id !== action.payload.userId)
      state.users = filteredItems
    }
  },
  // extraReducers: (builder)=>{
  //   builder
  //   .addCase(fetchUser.pending, (state) =>{
  //     state.isLoading = true
  //     state.error = null
  //   })
  //   .addCase(fetchUser.fulfilled, (state, action )=>{
  //     state.isLoading = false
  //     state.users = action.payload
  //   })
  //   .addCase(fetchUser.rejected, (state,action) =>{
  //     state.isLoading = false
  //     state.error = action.error.message || "Error"
  //   })
  // }
  
})

export const { login,logout, removeUser, addUser, usersRequest, usersSuccess, updateUser } = userSlice.actions
export default userSlice.reducer
// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    value: { userId: '', role: '' }
  },
  reducers: {
    setUser: (state, action) => {
      const user = action.payload
      state.value = { user }
    },
    clearUser: state => {
      state.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    }
  }
})

export const { setUser, clearUser } = usersSlice.actions

export default usersSlice

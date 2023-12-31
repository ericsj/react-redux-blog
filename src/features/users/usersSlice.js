import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState = {
  users: [],
  status: 'idle',
}


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get(USERS_URL)
    return response.data
  } catch (err) {
    return err.message
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = 'completed'
      state.users = action.payload
    })
  }
})

export const selectAllUsers = (state) => state.users.users
export const selectUsersStatus = (state) => state.users.status
export default usersSlice.reducer
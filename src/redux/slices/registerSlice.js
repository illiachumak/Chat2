import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  isLoading: false,
  email: '',
}


export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (userForm, thunkAPI) => {
    try {
      const {data} = await axios.post('http://localhost:5000/api/users/register', userForm)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue('Email is in use!')
    }
  }
)


export const registerSlice = createSlice({
  name: 'reg',
  initialState,
  reducers: {
    
  },
  
  extraReducers: {
    [registerUser.pending] : (state) => {
      state.isLoading = true;
      
    },
    [registerUser.fulfilled] : (state, action) => {
      state.email = action.payload.email;
      state.isLoading = false;
    },
    [registerUser.rejected] : (state) => {
      state.isLoading = false;
    },
    
  }
})


export default registerSlice.reducer

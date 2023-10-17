import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { base_url } from '../../assets/utils'

const initialState = {
  isLoading: false,
  needUpdate: false,

}

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (userForm, thunkAPI) => {
    try{
      const {data} = await axios.post(`${base_url}/api/users/login`, userForm)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue('Email or password is incorrect!')
    }
  
})

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setNeedUpdate: (state) => {
      state.needUpdate = false;
    },
  },
  
  extraReducers: {
    [loginUser.pending] : (state) => {
      state.isLoading = true;
      
    },
    [loginUser.fulfilled] : (state, action) => {
      state.needUpdate = !state.needUpdate;
      state.isLoading = false;
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    [loginUser.rejected] : (state, action) => {
      state.isLoading = false;
    },

  }
})
export const {setNeedUpdate, } = loginSlice

export default loginSlice.reducer

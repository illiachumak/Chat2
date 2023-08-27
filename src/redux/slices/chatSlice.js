import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  isLoading: false,
  userChats: [],
  potentialChats: [],
  currentChat: null,
}


export const loadingChats = createAsyncThunk(
  'loading/loadingChat',
  async (userId, thunkAPI) => {
    try{
      const { data: chats } = await axios.get(`http://localhost:5000/api/chat/${userId}`);
      const { data: users } = await axios.get('http://localhost:5000/api/users');
      
      const potentialChats = users.filter(user => {
        if (userId === user._id) return false;
        
        return !chats.some(chat => chat.members.includes(user._id));
      });
      

      return {chats, potentialChats}
    } catch (error) {
      return thunkAPI.rejectWithValue('User is not logged in!')
    }
  
})

export const createChat = createAsyncThunk(
  'create/createChat',
  async (users, thunkAPI) => {
    try{
      console.log(users)
      const { data: chat } = await axios.post(`http://localhost:5000/api/chat`, {firstId: users[0], secondId: users[1]});

      return {chat}
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong', error)
    }
  
})

export const getChat = createAsyncThunk(
  'get/getChat',
  async (users, thunkAPI) => {
    try{
      console.log(users)
      const { data } = await axios.get(`http://localhost:5000/api/chat/find/${users[0]}/${users[1]}`);


      return data
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong', error)
    }
  
})

export const chatsSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
  },
  
  extraReducers: {
    [loadingChats.pending] : (state) => {
      state.isLoading = true;
      
    },
    [loadingChats.fulfilled] : (state, action) => {
      state.userChats = action.payload.chats;
      state.potentialChats = action.payload.potentialChats;
      state.isLoading = false;
      
    },
    [loadingChats.rejected] : (state) => {
      state.isLoading = false;
    },
    [createChat.fulfilled] : (state, action) => {
      state.currentChat = action.payload.chat
      state.potentialChats = state.potentialChats.filter(user => {
        return action.payload.chat.members[1] !== user._id;
      });
    },
    [getChat.fulfilled] : (state, action) => {
      state.currentChat = action.payload
      console.log(action.payload)
    },
    

    
  }
})
export const {} = chatsSlice

export default chatsSlice.reducer

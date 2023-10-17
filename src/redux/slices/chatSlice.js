import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { base_url } from '../../assets/utils';

const initialState = {
  isLoading: false,
  userChats: [],
  potentialChats: [],
  currentChat: null,
  chatMessages: [],
  notifications: [],
}


export const loadingChats = createAsyncThunk(
  'loading/loadingChat',
  async (userId, thunkAPI) => {
    try{
      const { data: chats } = await axios.get(`${base_url}/api/chat/${userId}`);
      const { data: users } = await axios.get(`${base_url}/api/users`);
      
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
  'post/createChat',
  async (users, thunkAPI) => {
    try{
      console.log(users)
      const { data: chat } = await axios.post(`${base_url}/api/chat`, {firstId: users[0], secondId: users[1]});

      return {chat}
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong', error)
    }
  
})

export const getChat = createAsyncThunk(
  'get/getChat',
  async (users, thunkAPI) => {
    try{
      const { data: chat } = await axios.get(`${base_url}/api/chat/find/${users[0]}/${users[1]}`);
      const { data: messages } = await axios.get(`${base_url}/api/messages/${chat._id}`)

      return {chat, messages}
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong', error)
    }
  
})

export const sendMessage = createAsyncThunk(
  'post/sendMessage',
  async (props, thunkAPI) => {
    try{
      const message = await axios.post(`${base_url}/api/messages/`, {
        chatId: props.currentChatId,
        senderId: props.userId,
        text: props.inputText,
      })
      return message.data;
s
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong', error)
    }
  
})


const chatsSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      if(action.payload.chatId === state.currentChat){
        state.chatMessages.push(action.payload)
      } else {
        state.notifications = [...state.notifications, action.payload]
      }
      
    }
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
      state.userChats.push(action.payload.chat)
      state.currentChat = action.payload.chat
      state.potentialChats = state.potentialChats.filter(user => {
        return action.payload.chat.members[1] !== user._id;
      });
    },
    [getChat.fulfilled] : (state, action) => {
      state.currentChat = action.payload.chat
      state.chatMessages = action.payload.messages
    },
    [sendMessage.fulfilled] : (state, action) => {
      state.chatMessages = [...state.chatMessages, action.payload]
    },

    

    
  }
})
export const {setMessage} = chatsSlice.actions

export default chatsSlice.reducer

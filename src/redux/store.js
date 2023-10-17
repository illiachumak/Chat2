import { configureStore } from '@reduxjs/toolkit'
import login from './slices/loginSlice'
import register from './slices/registerSlice'
import chat from './slices/chatSlice'


export const store = configureStore({
  reducer: {
    login,
    register,
    chat,
  },
})
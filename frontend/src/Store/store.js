import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/setUser'

export default configureStore({
  reducer: {
    user:userReducer
  },
})
import { configureStore } from '@reduxjs/toolkit'
import myReducer from './reducers/myReducer'

export const store = configureStore({
  reducer: {
    myReducer:myReducer
  },
})
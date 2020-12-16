import { createStore } from 'redux'
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './reducers'

const storeState = configureStore({
  reducer: rootReducer
})
export default storeState
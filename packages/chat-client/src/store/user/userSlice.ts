import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id?: number,
  name?: string,
  avator?: string
}

const initialState: User = {
  id: 0,
  name: '',
  avator: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      return action.payload
    }
  }
})

export default userSlice.reducer

export const { setUser } = userSlice.actions
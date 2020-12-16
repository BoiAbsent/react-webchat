import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/store/user/userSlice'

export interface Friends {
  [propName: string]: User
}

const initialState: Friends = {}

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    updateFriend(state, action: PayloadAction<User>) {
      state[action.payload.id] = action.payload
    },
    updateFriendsList(state, action: PayloadAction<Friends>) {
      return action.payload
    }
  }
})

export default friendsSlice.reducer

export const { updateFriend, updateFriendsList } = friendsSlice.actions
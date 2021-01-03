import { combineReducers } from 'redux'
import userReducer from './user/userSlice'
import conversationReducer from '../components/Conversations/ConversationsSlice'
import FriendsListReduser from '../components/FriendsList/FriendslistSlice'

const rootReducer = combineReducers({
  user: userReducer,
  conversations: conversationReducer,
  friends: FriendsListReduser
})
export default rootReducer

export type StoreState = ReturnType<typeof rootReducer>
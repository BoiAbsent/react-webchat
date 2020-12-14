import { combineReducers } from 'redux'
import user from './user/reducer'
import global from '../components/Layout/reducer/reducer'
import conversationStore from '../components/Conversations/reducer/reducer'
import FrindsListStore from '../components/FriendsList/reducer/reducer'


export default combineReducers<StoreState>({
  user,
  global,
  conversationStore,
  FrindsListStore
})
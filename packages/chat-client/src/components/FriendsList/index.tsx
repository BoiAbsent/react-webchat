import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { StoreState } from '@/store/reducers'
import { Friends } from '@/components/FriendsList/FriendslistSlice'
import { updateCurrent } from '../Conversations/ConversationsSlice'
import { useFetchFriends } from './hooks'

const FriendsList: React.FC = () => {
  useFetchFriends()
  const history = useHistory()
  const dispatch = useDispatch()
  const id = useSelector((state: StoreState) => state.user.id)
  const friends = useSelector((state: StoreState) => state.friends)
  const friendsList = Object.keys(friends).filter(f => f !== String(id)).sort((a, b) => friends[a].name.localeCompare(friends[b].name))


  return  (
    <div className="friends">
      {friendsList.map(f => (
        <div
          key={f}
          onClick={() => {
            dispatch(updateCurrent(Number(f)))
            history.push('/conversation')
          }}
        >
          {friends[f].name}
        </div>
      ))}
    </div>
  )
}
export default FriendsList
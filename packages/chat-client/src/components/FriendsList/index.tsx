import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { useFriendsList } from '@/components/FriendsList/hooks'
import { useUser } from '@/store/user/hooks'
import { updateCurrent } from '../Conversations/ConversationsSlice'
import { useFetchFriends } from './hooks'
import './style'

const FriendsList: React.FC = () => {
  useFetchFriends()
  const history = useHistory()
  const dispatch = useDispatch()
  const { id } = useUser()
  const friends = useFriendsList()
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
          className="friend-item"
        >
          <div className="friend-item-avator">{friends[f].name}</div>
          <div className="friend-item-name">{friends[f].name}</div>
        </div>
      ))}
    </div>
  )
}
export default FriendsList
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { updateCurrent } from '../Conversations/reducer/action'
import { useFetchFriends } from './hooks'

const FriendsList: React.FC = () => {
  useFetchFriends()
  const history = useHistory();
  const dispatch = useDispatch()
  const id = useSelector<StoreState, number>(state => state.user.id)
  const friends = useSelector<StoreState, Friends>(state => state.FrindsListStore)
  const friendsList = Object.keys(friends).filter(f => f !== String(id))


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
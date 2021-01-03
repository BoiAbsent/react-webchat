import { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { StoreState } from '@/store/reducers'
import { updateFriendsList } from './FriendslistSlice'

export const useFetchFriends = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(() => {
      dispatch(updateFriendsList({
        '101': {
          id: 101,
          name: 'Boi',
          avator: ''
        },
        '103': {
          id: 103,
          name: '张三',
          avator: ''
        },
        '104': {
          id: 104,
          name: '李四',
          avator: ''
        },
        '105': {
          id: 105,
          name: '王五',
          avator: ''
        },
        '106': {
          id: 106,
          name: '赵六',
          avator: ''
        }
      }))
    }, 500)
  }, []);
}

export const useFriendsList = () => {
  return useSelector((state: StoreState) => state.friends)
}

export const useFriend = (id?: number | string) => {
  return useSelector((state: StoreState) => state.friends[id], shallowEqual) || {name: '', avator: '', id: 0}
}
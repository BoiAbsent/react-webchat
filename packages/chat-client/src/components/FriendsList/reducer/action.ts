import * as types from './types'

export function updateFriend(friend: User): types.UpdateFriendAction {
  return {
    type: types.UPDATE_FRIEND,
    payload: friend
  }
}

export function updateFriendsList(list: Friends): types.UpdateFriendsListAction {
  return {
    type: types.UPDATE_FRIENDS_LIST,
    payload: list
  }
}
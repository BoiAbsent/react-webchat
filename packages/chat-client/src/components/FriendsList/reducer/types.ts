export const UPDATE_FRIENDS_LIST = 'UPDATE_FRIENDS_LIST'
export const UPDATE_FRIEND = 'UPDATE_FRIEND'

export interface UpdateFriendsListAction {
  type: typeof UPDATE_FRIENDS_LIST,
  payload: Friends
}

export interface UpdateFriendAction {
  type: typeof UPDATE_FRIEND,
  payload: User
}


export type FriendsListAction = UpdateFriendsListAction | UpdateFriendAction
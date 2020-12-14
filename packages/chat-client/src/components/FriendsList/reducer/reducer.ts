import * as types from './types'

export default function FriendsListReducer(state:Friends = {}, action:types.FriendsListAction):Friends {
  switch (action.type) {
    case types.UPDATE_FRIEND: {
      return {
        ...state,
        [String(action.payload.id)]: action.payload
      }
    }
    case types.UPDATE_FRIENDS_LIST: {
      return {
        ...action.payload
      }
    }
    default:
      return state
  }
}
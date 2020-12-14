import { SET_USER, UserAction } from './types'

export default function user(state:User = {}, action:UserAction):User {
  switch (action.type) {
    case SET_USER:
      return {
        ...action.payload
      }
    default: 
      return state
  }
}
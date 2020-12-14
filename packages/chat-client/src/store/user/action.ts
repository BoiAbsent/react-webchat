import { SET_USER, UserAction } from './types'

export function setUser(user: User): UserAction {
  return {
    type: SET_USER,
    payload: user
  }
}
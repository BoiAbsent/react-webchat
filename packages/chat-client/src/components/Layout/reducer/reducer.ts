import * as types from './types'

export default function SocketReducer(state = {
  socket: null
}, action: types.SocketAction):Global {
  switch (action.type) {
    case types.SET_SOCKET:
      return {
        socket: action.payload
      }
    case types.REMOVE_SOCKET:
      return {
        socket: null
      }
    default: {
      return state
    }
  }
}
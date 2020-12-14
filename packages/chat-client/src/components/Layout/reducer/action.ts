import * as types from './types'

export function setSocket(socket: SocketIOClient.Socket): types.SetSocketAction {
  return {
    type: types.SET_SOCKET,
    payload: socket
  }
}

export function removeSocket(): types.RemoveSocketAction {
  return {
    type: types.REMOVE_SOCKET
  }
}
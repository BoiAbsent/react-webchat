export const SET_SOCKET = 'SET_SOCKET'
export const REMOVE_SOCKET = 'REMOVE_SOCKET'

export interface SetSocketAction {
  type: typeof SET_SOCKET,
  payload: SocketIOClient.Socket
}

export interface RemoveSocketAction {
  type: typeof REMOVE_SOCKET
}


export type SocketAction = SetSocketAction | RemoveSocketAction
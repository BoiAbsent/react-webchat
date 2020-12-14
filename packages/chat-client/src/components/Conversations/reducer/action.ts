import * as types from './types'

export function updateCurrent(current: number): types.UpdateConversationCurrentAction {
  return {
    type: types.UPDATE_CONVERSATION_CURRENT,
    payload: current
  }
}

export function sendMsgAction(msg:Message): types.SendMsgAction {
  return {
    type: types.UPDATE_CONVERSATIONS_BY_SEND,
    payload: msg
  }
}

export function receiveMsgAction(msg:Message): types.ReceiveMsgAction {
  return {
    type: types.UPDATE_CONVERSATIONS_BY_REVC,
    payload: msg
  }
}
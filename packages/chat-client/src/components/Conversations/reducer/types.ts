export const UPDATE_CONVERSATION_CURRENT = 'UPDATE_CONVERSATION_CURRENT'
export const UPDATE_CONVERSATIONS_BY_SEND = 'UPDATE_CONVERSATIONS_BY_SEND'
export const UPDATE_CONVERSATIONS_BY_REVC = 'UPDATE_CONVERSATIONS_BY_REVC'

export interface UpdateConversationCurrentAction {
  type: typeof UPDATE_CONVERSATION_CURRENT,
  payload: number
}

export interface ReceiveMsgAction {
  type: typeof UPDATE_CONVERSATIONS_BY_REVC,
  payload: Message
}

export interface SendMsgAction {
  type: typeof UPDATE_CONVERSATIONS_BY_SEND,
  payload: Message
}


export type ConversationAction = UpdateConversationCurrentAction | ReceiveMsgAction | SendMsgAction
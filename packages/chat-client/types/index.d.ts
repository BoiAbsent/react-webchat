declare interface User {
  id?: number,
  name?: string,
  avator?: string
}

declare interface Friends {
  [propName: string]: User
}

declare interface Global {
  socket: SocketIOClient.Socket | void
}

declare interface Message {
  id: number,
  to_id: number,
  from_id: number,
  content: string,
  create_time: number,
}

declare interface Conversation {
  mate_id: number,
  last_msg: string,
  last_timestamp: number,
  unread: number,
  messages: Message[]
}

declare interface ConversationMap {
  [propName: string]: Conversation
}

declare interface ConversationStore {
  current: number | null
  map: ConversationMap
}

declare interface StoreState {
  user: User,
  global: Global,
  conversationStore: ConversationStore,
  FrindsListStore: Friends
}
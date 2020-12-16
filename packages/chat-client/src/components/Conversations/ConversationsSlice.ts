import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Message {
  id: number,
  to_id: number,
  from_id: number,
  content: string,
  create_time: number,
}

export interface Conversation {
  mate_id: number,
  last_msg: string,
  last_timestamp: number,
  unread: number,
  messages: Message[]
}

export interface ConversationMap {
  [propName: string]: Conversation
}

export interface ConversationStore {
  current: number | void
  map: ConversationMap
}

const initialState: ConversationStore = {
  current: null,
  map: {}
}

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    updateCurrent(state, action: PayloadAction<number>) {
      let id = action.payload
      if (state.map[id]) {
        state.map[id].unread = 0
      } else {
        state.map[id] = {
          mate_id: action.payload,
          last_msg: '',
          last_timestamp: 0,
          unread: 0 ,
          messages: []
        }
      }
      state.current = id
    },
    sendMessage(state, action: PayloadAction<Message>) {
      const { to_id, content, create_time } = action.payload
      if (state.map[to_id]) {
        state.map[to_id].last_msg = content
        state.map[to_id].last_timestamp = create_time
        state.map[to_id].messages.push(action.payload)
        if (state.current !== to_id) state.map[to_id].unread += 1
      } else {
        state.map[to_id] = {
          mate_id: to_id,
          last_msg: content,
          last_timestamp: create_time,
          unread: state.current ? 1 : 0,
          messages: [action.payload]
        }
        if (!state.current) state.current = to_id
      }
    },
    receiveMessage(state, action: PayloadAction<Message>) {
      const { from_id, create_time, content } = action.payload
      if (state.map[from_id]) {
        state.map[from_id].last_msg = content
        state.map[from_id].last_timestamp = create_time
        state.map[from_id].messages.push(action.payload)
        if (state.current !== from_id) state.map[from_id].unread += 1
      } else {
        state.map[from_id] = {
          mate_id: from_id,
          last_msg: content,
          last_timestamp: create_time,
          unread: state.current ? 1 : 0,
          messages: [action.payload]
        }
        if (!state.current) state.current = from_id
      }
    }
  }
})

export default conversationsSlice.reducer

export const { updateCurrent, sendMessage, receiveMessage } = conversationsSlice.actions


// export default function ConversationListReducer(state:ConversationStore = {
//   current: null,
//   map: {}
// }, action:types.ConversationAction):ConversationStore {
//   switch (action.type) {
//     case types.UPDATE_CONVERSATION_CURRENT: {
//       let result = {
//         current: state.current,
//         map: {
//           ...state.map
//         }
//       }
//       if (action.payload != state.current) {
//         result.current = action.payload
//         if (result.map[action.payload]) {
//           result.map[action.payload].unread = 0 
//         } else {
//           result.map[action.payload] = {
//             mate_id: action.payload,
//             last_msg: '',
//             last_timestamp: 0,
//             unread: 0 ,
//             messages: []
//           }
//         }
//       }
//       return result
//     }
//     case types.UPDATE_CONVERSATIONS_BY_SEND: {
//       let to_id = String(action.payload.to_id)
//       let result = {
//         ...state,
//         map: {
//           ...state.map,
//           [to_id]: {
//             mate_id: action.payload.to_id,
//             last_msg: action.payload.content,
//             last_timestamp: action.payload.create_time,
//             unread: String(state.current) === to_id ? 0 : (state.map[to_id] ? state.map[to_id].unread + 1 : 1),
//             messages: [
//               ...(state.map[to_id] ? state.map[to_id].messages : []),
//               action.payload
//             ]
//           }
//         }
//       }
//       return result
//     }
//     case  types.UPDATE_CONVERSATIONS_BY_REVC: {
//       let from_id = String(action.payload.from_id)
//       return {
//         current: state.current || action.payload.from_id,
//         map: {
//           ...state.map,
//           [from_id]: {
//             mate_id: action.payload.from_id,
//             last_msg: action.payload.content,
//             last_timestamp: action.payload.create_time,
//             unread: String(state.current) === from_id ? 0 : (state.map[from_id] ? state.map[from_id].unread + 1 : 1),
//             messages: [
//               ...(state.map[from_id] ? state.map[from_id].messages : []),
//               action.payload
//             ]
//           }
//         }
//       }
//     }
      
//     default:
//       return state
//   }
// }
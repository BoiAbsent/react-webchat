import * as types from './types'

export default function ConversationListReducer(state:ConversationStore = {
  current: null,
  map: {
    // '103': {
    //   mate_id: 103,
    //   last_msg: '我是103号',
    //   last_timestamp: 1607650014754,
    //   unread: 0 ,
    //   messages: [{
    //     id: 1607650014754,
    //     to_id: 101,
    //     from_id: 103,
    //     content: '我是张三',
    //     create_time: 1607650014754,
    //   }]
    // },
    // '105': {
    //   mate_id: 105,
    //   last_msg: '我是105号',
    //   last_timestamp: 1607650014754,
    //   unread: 0 ,
    //   messages: [{
    //     id: 1607650014754,
    //     to_id: 101,
    //     from_id: 105,
    //     content: '我是王五',
    //     create_time: 1607650014754,
    //   }]
    // }
  }
}, action:types.ConversationAction):ConversationStore {
  switch (action.type) {
    case types.UPDATE_CONVERSATION_CURRENT: {
      let result = {
        ...state
      }
      if (action.payload != state.current) {
        result.current = action.payload
        if (result.map[action.payload]) {
          result.map[action.payload].unread = 0 
        } else {
          result.map[action.payload] = {
            mate_id: action.payload,
            last_msg: '',
            last_timestamp: 0,
            unread: 0 ,
            messages: []
          }
        }
      }
      return result
    }
    case types.UPDATE_CONVERSATIONS_BY_SEND: {
      let to_id = String(action.payload.to_id)
      let result = {
        ...state,
        map: {
          ...state.map,
          [to_id]: {
            mate_id: action.payload.to_id,
            last_msg: action.payload.content,
            last_timestamp: action.payload.create_time,
            unread: String(state.current) === to_id ? 0 : (state.map[to_id] ? state.map[to_id].unread + 1 : 1),
            messages: [
              ...(state.map[to_id] ? state.map[to_id].messages : []),
              action.payload
            ]
          }
        }
      }
      return result
    }
    case  types.UPDATE_CONVERSATIONS_BY_REVC: {
      let from_id = String(action.payload.from_id)
      let result = state
      return {
        current: state.current || action.payload.from_id,
        map: {
          ...state.map,
          [from_id]: {
            mate_id: action.payload.from_id,
            last_msg: action.payload.content,
            last_timestamp: action.payload.create_time,
            unread: String(state.current) === from_id ? 0 : (state.map[from_id] ? state.map[from_id].unread + 1 : 1),
            messages: [
              ...(state.map[from_id] ? state.map[from_id].messages : []),
              action.payload
            ]
          }
        }
      }
    }
      
    default:
      return state
  }
}
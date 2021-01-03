import { useSelector, shallowEqual } from 'react-redux'
import { ConversationMap } from './ConversationsSlice'
import { StoreState } from '@/store/reducers'

export const useConversations = (): [ConversationMap, number | void] => {
  const { map, current } = useSelector((store: StoreState) => store.conversations, shallowEqual)
  return [map, current]
}

export const useConversation = (current: number | void) => {
  return useSelector((store: StoreState) => store.conversations.map[current as number], shallowEqual) || { mate_id: 0, messages: [] }
}
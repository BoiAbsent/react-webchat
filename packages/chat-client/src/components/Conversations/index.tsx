import React from 'react'
import { useSelector } from 'react-redux'
import { useConversations } from '@/components/Conversations/hooks'
import ConversationItem from './components/ConversationItem/ConversationItem'
import MessageBox from './components/MessageBox'

export default function ConversationList() {
  const [conversations, current] = useConversations()
  const convList = Object.keys(conversations).sort((a, b) => conversations[b].last_timestamp - conversations[a].last_timestamp)

  console.log('render-ConversationList',conversations)
  return  (
    <div className="conversations">
      <div>
        {convList.map(c => (
          <ConversationItem
            id={conversations[c].mate_id}
            time={conversations[c].last_timestamp}
            msg={conversations[c].last_msg}
            unread={conversations[c].unread}
            current={Number(current)}
            key={conversations[c].mate_id}
          />
        ))}
      </div>
      {current && <MessageBox current={current}/>}
    </div>
  )
}
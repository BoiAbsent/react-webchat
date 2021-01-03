import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { useConversation } from '@/components/Conversations/hooks'
import { useUser } from '@/store/user/hooks'
import { useFriend } from '@/components/FriendsList/hooks'
import MessageItem from './MessageItem'
import MessageSender from './MessageSender'
import './style'

interface MessageBoxProps {
  current: number | void
}

const MessageBox: React.FC<MessageBoxProps> = ({current}) => {
  const user = useUser()
  const conv = useConversation(current)

  const { mate_id, messages = [] } = conv
  const { id, name, avator } = user
  const mate = useFriend(mate_id) || {}
  const { name: mate_name, avator: mate_avator } = mate

  const [ targetDom, setTargetDom ] = useState(null)
  useEffect(() => {
    setTargetDom(document.querySelector('#main-content'))
  }, [])

  useEffect(() => {
    let newMsgDom = document.querySelector('.message-item:last-of-type')
    newMsgDom && newMsgDom.scrollIntoView && newMsgDom.scrollIntoView()
  })

  const messageContent = (
    <div className="message-box">
      <div className="message-box-title">
        {mate_name}
      </div>
      <div className="message-box-content">
        {messages.map(m => (
          <MessageItem
            mateName={mate_name}
            mateAvator={mate_avator}
            userName={name}
            userAvator={avator}
            msg={m}
            type={m.from_id == id ? 'send' : 'recv'}
            key={m.id}
          />
        ))}
      </div>
      <div className="message-box-bottom">
        <MessageSender 
          userId={id}
          toId={mate_id}
        />
      </div>
    </div>
  )
  console.log('render-MessageBox-', mate_id)
  return  (
    targetDom ? ReactDom.createPortal(messageContent, targetDom) : null
  )
}

export default React.memo(MessageBox)
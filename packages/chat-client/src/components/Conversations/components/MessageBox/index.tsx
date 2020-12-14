import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import MessageItem from './MessageItem'
import MessageSender from './MessageSender'
import './style'

const MessageBox: React.FC = () => {
  const user = useSelector<StoreState, User>(store => store.user)
  const current = useSelector<StoreState, number>(store => store.conversationStore.current)
  const conv = useSelector<StoreState, Conversation | void>(store => store.conversationStore.map[String(current)]) || {}

  const { mate_id, messages = [] } = conv as Conversation
  const { id, name, avator } = user
  const mate = useSelector<StoreState, User>(store => store.FrindsListStore[mate_id]) || {}
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
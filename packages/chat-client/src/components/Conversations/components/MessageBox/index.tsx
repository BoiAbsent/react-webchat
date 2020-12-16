import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { StoreState } from '@/store/reducers'
import MessageItem from './MessageItem'
import MessageSender from './MessageSender'
import './style'

interface MessageBoxProps {
  current: Number | void
}

const MessageBox: React.FC<MessageBoxProps> = ({current}) => {
  const user = useSelector((store: StoreState) => store.user)
  // Stale Props: 可能会出现，但是即使 useSelector 先于 current 更新之前执行，current 更新后依然会 reRender，不影响页面展示
  // Zombie Children: 未来支持删除聊天的功能后可能出现，但是 tore.conversations.map 一定存在，所以 useSelector 内不会报错
  const conv = useSelector((store: StoreState) => store.conversations.map[String(current)]) || { mate_id: 0, messages: [] }

  const { mate_id, messages = [] } = conv
  const { id, name, avator } = user
  const mate = useSelector((store: StoreState) => store.friends[mate_id]) || {}
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
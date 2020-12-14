import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateCurrent } from '../../reducer/action'
import './ConversationItem.css'

interface ConversationItemProps {
  id: number,
  msg: string,
  time: number,
  unread: number,
  current: number
}

const ConversationItem: React.FC<ConversationItemProps> = (props) => {
  const { id, msg, time, unread, current } = props
  const mate = useSelector<StoreState, User>(state => state.FrindsListStore[id]) || {name: '', avator: ''}
  const { name, avator } = mate

  const dispatch = useDispatch() 

  let showTime = null
  if (time) {
    const today = new Date(new Date().setHours(0, 0, 0, 0)).getTime()
    const yestoday = today - 24 * 60 * 60 * 1000
    const lastTime = new Date(time).getTime()
    showTime = lastTime < yestoday ?  new Date(lastTime).toLocaleDateString() : (
      lastTime < today ? '昨天' : new Date(lastTime).toLocaleTimeString('chinese', { hour12: false })
    )
  }
  

  console.log('render-ConversationItem-', id)
  return (
    <div className={`conversation-item${current === id ? ' conversation-item-active' : ''}`} onClick={() => {dispatch(updateCurrent(id))}}>
      <div
        className="conversation-item-avator"
        style={avator ? {
          "backgroundImage": `url(${avator})`,
          "backgroundSize": "cover"
        } : {}}
      >
        <div>
          {!avator && name}
        </div> 
        {!!unread && <div className="conversation-item-notice">{unread}</div>}
      </div>
      <div className="conversation-item-info">
        <div className="conversation-item-top">
          <div className="conversation-item-name">{name}</div>
          <div className="conversation-item-time">{showTime}</div>
        </div>
        <div className="conversation-item-bottom">
          {msg}
        </div>
      </div>
    </div>
  )
}

export default React.memo(ConversationItem)
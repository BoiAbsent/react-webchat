import React from 'react'

interface MessageItemProps {
  mateName: string,
  mateAvator: string,
  userName: string,
  userAvator: string,
  type: 'send' | 'recv',
  msg: Message
}


const MessageItem: React.FC<MessageItemProps> = (props) => {
  const { mateName, mateAvator, userName, userAvator, msg, type } = props

  return (
    type === 'send' ? 
      <div className="message-item message-item-send">
        <div className="message-item-detail">
          {/* <div className="message-item-name">{userName}</div> */}
          <div className="message-item-content">{msg.content}</div>
        </div>
        <div
          className="message-item-avator"
          style={userAvator ? {'backgroundImage': `url(${userAvator})`} : {}}
        >{userAvator ? '' : mateName}</div>
      </div> 
        : 
      <div className="message-item message-item-recv">
        <div
          className="message-item-avator"
          style={mateAvator ? {'backgroundImage': `url(${mateAvator})`} : {}}
        >{userAvator ? '' : mateName}</div>
        <div className="message-item-detail">
          {/* <div className="message-item-name">{mateName}</div> */}
          <div className="message-item-content">{msg.content}</div>
        </div>
      </div>
  )
}

export default React.memo(MessageItem)
import React, { useState } from 'react'

interface MessageSenderProps {
  userId: number,
  toId: number
}

const MessageSender: React.FC<MessageSenderProps> = (props) => {
  const { userId, toId } = props
  
  const [ content, setContent ] = useState('')

  const sendMsg = () => {
    if (window.socket && userId && toId) {
      window.socket.emit('send_msg', {
        to_id: toId,
        from_id: userId,
        content: content,
        create_time: new Date().getTime(),
      })
    }
    setContent('')
  }


  return (
    <div className="message-sender">
      <textarea
        value={content}
        onChange={(e) => {setContent(e.target.value)}}
        placeholder="请输入"
      ></textarea>
      <div
        className="message-sender-submit"
        onClick={sendMsg}
      >
        发送
      </div>
    </div>
  )
}

export default MessageSender
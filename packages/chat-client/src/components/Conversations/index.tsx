import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StoreState } from '@/store/reducers'
import ConversationItem from './components/ConversationItem/ConversationItem'
import MessageBox from './components/MessageBox'
// import { updateCurrent, receiveMessage, sendMessage } from './reducer/action'

export default function ConversationList() {
  const current = useSelector((store: StoreState) => store.conversations.current)
  const conversations = useSelector((store: StoreState) => store.conversations.map)
  const convList = Object.keys(conversations).sort((a, b) => conversations[b].last_timestamp - conversations[a].last_timestamp)
  // const dispatch = useDispatch() 
  // window['test'] = () => {dispatch(updateCurrent(2))}
  // window['test2'] = () => {dispatch(receiveMessage({
  //   id: new Date().getTime(),
  //   to_id: 101,
  //   from_id: 103,
  //   content: '我是张三',
  //   create_time: new Date().getTime(),
  // }))}
  // window['test3'] = () => {dispatch(sendMessage({
  //   id: new Date().getTime(),
  //   to_id: 104,
  //   from_id: 101,
  //   content: '我是Boi',
  //   create_time: new Date().getTime(),
  // }))}

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
          // <div key={conversations[c].mate_id} onClick={() => {dispatch(updateCurrent(conversations[c].mate_id))}}>
          //   {conversations[c].mate_name}
          // </div>
        ))}
      </div>
      {current && <MessageBox current={current}/>}
    </div>
  )
}
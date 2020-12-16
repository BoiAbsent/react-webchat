import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import io from 'socket.io-client';
import { Message, sendMessage, receiveMessage } from '../Conversations/ConversationsSlice'
import Nav from '../Nav'
import ConversationList from '../Conversations'
import FriendsList from '../FriendsList'
import Search from '../Search'
import { StoreState } from '@/store/reducers'
import { useFetchFriends } from '../FriendsList/hooks'
import './style'

export default function Layout() {
  const dispatch = useDispatch()
  const id = useSelector((state: StoreState) => state.user.id)
  useFetchFriends()
  React.useEffect(() => {
    window.socket = io('/', {
      port: '3333'
    });
    window.socket.emit('init_link', {
      id
    })
    window.socket.on('recv_msg',(data: Message)=>{
      console.log('recv_msg',data)
      let action = data.to_id == id ? receiveMessage : (data.from_id == id ? sendMessage : null)
      if (action) {
        dispatch(action(data))
      }
    })
    return () => {
      (window.socket as SocketIOClient.Socket).close();
      window.socket = null
    };
  }, [dispatch]);
  return  (
    <div className="layout">
      <Nav/>
      <Router>
        <div className="container">
          <div className="side-list">
            <Search/>
            <Switch>
              <Route exact path="/conversation">
                <ConversationList/>
              </Route>
              <Route exact path="/friends">
                <FriendsList/>
              </Route>
              <Redirect to="/conversation"/>
            </Switch>
          </div>
          <div id="main-content"></div>
        </div>
      </Router>
    </div>
  )
}
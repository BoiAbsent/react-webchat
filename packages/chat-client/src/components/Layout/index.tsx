import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import io from 'socket.io-client';
import Nav from '../Nav'
import ConversationList from '../Conversations'
import FriendsList from '../FriendsList'
import Search from '../Search'
import { useFetchFriends } from '../FriendsList/hooks'
import { setSocket, removeSocket } from './reducer/action'
import { sendMsgAction, receiveMsgAction } from '../Conversations/reducer/action'
import './style'

export default function Layout() {
  const dispatch = useDispatch()
  const id = useSelector<StoreState, number>(state => state.user.id)
  useFetchFriends()
  React.useEffect(() => {
    const socket: SocketIOClient.Socket = io('/', {
      port: '3333'
    });
    socket.emit('init_link', {
      id
    })
    socket.on('recv_msg',(data: Message)=>{
      console.log('recv_msg',data)
      let action = data.to_id == id ? receiveMsgAction : (data.from_id == id ? sendMsgAction : null)
      if (action) {
        dispatch(action(data))
      }
    })
    dispatch(setSocket(socket));
    return () => {
      socket.close();
      dispatch(removeSocket());
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
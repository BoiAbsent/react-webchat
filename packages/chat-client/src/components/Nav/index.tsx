import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './style'

const Nav:React.FC =  () => {
  const user  = useSelector<StoreState, User>((state) => state.user)
  return  (
    <div className="nav">
      <div className="nav-name">{user.name}</div>
      <div className="nav-bar">
        <NavLink to="/conversation" activeClassName="actived-nav">消息</NavLink>
        <NavLink to="/friends" activeClassName="actived-nav">好友</NavLink>
      </div>
    </div>
  )
}

export default Nav
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useUser } from '@/store/user/hooks'
import './style'

const Nav:React.FC =  () => {
  const user  = useUser()
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
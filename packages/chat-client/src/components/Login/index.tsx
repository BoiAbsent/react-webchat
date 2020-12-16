import React from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/user/userSlice'
import './style'

export default function Login() {
  const dispatch = useDispatch()

  return  (
    <div className="login">
      <div className="identity" onClick={() => {dispatch(setUser({
        id: 101,
        name: 'Boi',
        avator: ''
      },))}}>Boi</div>
      <div className="identity" onClick={() => {dispatch(setUser({
        id: 103,
        name: '张三',
        avator: ''
      },))}}>张三</div>
      <div className="identity" onClick={() => {dispatch(setUser({
        id: 104,
        name: '李四',
        avator: ''
      },))}}>李四</div>
      <div className="identity" onClick={() => {dispatch(setUser({
        id: 105,
        name: '王五',
        avator: ''
      },))}}>王五</div>
      <div className="identity" onClick={() => {dispatch(setUser({
        id: 106,
        name: '赵六',
        avator: ''
      },))}}>赵六</div>
    </div>
  )
}
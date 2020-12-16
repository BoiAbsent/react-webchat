import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { StoreState } from './store/reducers'
import Loading from './components/Loading'
import Layout from './components/Layout'
import Login from './components/Login'
import './App.css'

function useCheckSigin() {
  const [checking, setChecking] = useState(false)
  // const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      setChecking(true);
      try {
        // const {code, data} = await fetch('127.0.0.1:3333').then(res => res.json());
        // if (code === 200) {
        //   dispatch(setUser(data))
        // }
        setTimeout(() => {
          setChecking(false)
        }, 0);
      } catch {}
      // setChecking(false);
    };
    fetchData()
  }, [])
  
  return checking
}

const App: React.FC = () => {
  const user = useSelector((store: StoreState) => store.user)
  const checking = useCheckSigin()
  return (
    <>
      {checking && <Loading/>}
      <Router>
        <Switch>
          <Route path="/login">
            {user.id ? <Layout/> : <Login/>}
          </Route>
          {!user.id && <Redirect to="/login" />}
          <Route>
            <Layout/>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
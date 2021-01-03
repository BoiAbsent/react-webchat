import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { useUser } from '@/store/user/hooks'
import Loading from './components/Loading'
import Layout from './components/Layout'
import Login from './components/Login'
import './App.css'

function useCheckSigin() {
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setChecking(true);
      try {
        setTimeout(() => {
          setChecking(false)
        }, 0);
      } catch {}
    };
    fetchData()
  }, [])
  
  return checking
}

const App: React.FC = () => {
  const user = useUser()
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
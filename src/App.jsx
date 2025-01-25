import React from 'react'
import { useSelector } from 'react-redux'
import {Routes, Route} from 'react-router'
import Register_Login from './pages/Register_Login/Register_Login'
import { Toaster } from 'react-hot-toast'
import UserDashboard from './pages/UserDashboard/UserDashboard'
import Home from './pages/Home/Home'

const App = () => {
  const userActive = useSelector(state=>state.userReducer.activeUser)
  console.log(userActive)
  return (

    <>

    <Toaster/>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register-login' element={<Register_Login/>}/>
      <Route path='/user-dashboard' element={<UserDashboard/>}/>
    </Routes>
    </>

  )
}

export default App
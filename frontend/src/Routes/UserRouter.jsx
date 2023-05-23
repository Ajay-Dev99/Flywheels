import React from 'react'
import {Routes,Route} from 'react-router-dom'
import UserloginPage from '../Pages/User/UserloginPage'
import UserSignuppage from '../Pages/User/UserSignuppage'
import UserOtpPage from '../Pages/User/UserOtpPage'
import UserHomePage from '../Pages/User/UserHomePage'
import AdminLogin from '../Components/Admin/AdminLogin'

function UserRouter() {
  return (
    <Routes>
      <Route path='/' element={<UserHomePage/>}/>
        <Route path='/login' element={<UserloginPage/>}/>
        <Route path='/signup' element={<UserSignuppage/>}/>
        <Route path='/otp' element={<UserOtpPage/>}/>
       
    </Routes>
  )
}

export default UserRouter

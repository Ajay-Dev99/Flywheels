import React from 'react'
import {Routes,Route} from 'react-router-dom'
import UserloginPage from '../Pages/User/UserloginPage'
import UserSignuppage from '../Pages/User/UserSignuppage'
import UserOtpPage from '../Pages/User/UserOtpPage'
import UserHomePage from '../Pages/User/UserHomePage'
import UserVehicleviewPage from '../Pages/User/UserVehicleviewPage'
import AboutPage from '../Pages/User/AboutPage'

function UserRouter() {
  return (
    <Routes>
      <Route path='/' element={<UserHomePage/>}/>
      <Route path='/aboutus' element={<AboutPage/>}/>
        <Route path='/login' element={<UserloginPage/>}/>
        <Route path='/signup' element={<UserSignuppage/>}/>
        <Route path='/otp' element={<UserOtpPage/>}/>
        <Route path='/viewvehicles' element={<UserVehicleviewPage/>}/>   
    </Routes>
  )
}

export default UserRouter

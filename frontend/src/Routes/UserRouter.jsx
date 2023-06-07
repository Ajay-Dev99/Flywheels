import React from 'react'
import {Routes,Route} from 'react-router-dom'
import UserloginPage from '../Pages/User/UserloginPage'
import UserSignuppage from '../Pages/User/UserSignuppage'
import UserOtpPage from '../Pages/User/UserOtpPage'
import UserHomePage from '../Pages/User/UserHomePage'
import UserVehicleviewPage from '../Pages/User/UserVehicleviewPage'
import AboutPage from '../Pages/User/AboutPage'
import VehicleDetailsPage from '../Pages/User/VehicleDetailsPage'
import BookingPage from '../Pages/User/BookingPage'
import OurHubsPages from '../Pages/User/OurHubsPages'

function UserRouter() {
  return (
    <Routes>
        <Route path='/' element={<UserHomePage/>}/>
        <Route path='/aboutus' element={<AboutPage/>}/>
        <Route path='/login' element={<UserloginPage/>}/>
        <Route path='/signup' element={<UserSignuppage/>}/>
        <Route path='/otp' element={<UserOtpPage/>}/>
        <Route path='/viewvehicles' element={<UserVehicleviewPage/>}/>   
        <Route path='/singlepage/:id' element={<VehicleDetailsPage/>} />
        <Route path='/bookacar/:id' element={<BookingPage/>}/>
        <Route path='/ourhubs' element={<OurHubsPages/>}/>
        
    </Routes>
  )
}

export default UserRouter

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
import PaymentPage from '../Pages/User/PaymentPage'
import OrderSuccessPage from '../Pages/User/OrderSuccessPage'
import UserProfilePage from '../Pages/User/UserProfilePage'
import UserBookingsPage from '../Pages/User/UserBookingsPage'

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
        <Route path='/payment' element = {<PaymentPage/>}/>
        <Route path='/ordersuccess' element={<OrderSuccessPage/>}/>
        <Route path ="/profile" element={<UserProfilePage/>}/>
        <Route path='/Bookings' element={<UserBookingsPage/>}/>
        
    </Routes>
  )
}

export default UserRouter

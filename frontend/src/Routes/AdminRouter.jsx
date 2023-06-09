import React from 'react'
import { Routes ,Route } from 'react-router-dom'
import AdminLoginPage from '../Pages/Admin/AdminLoginPage'
import AdminDashboardpage from '../Pages/Admin/AdminDashboardpage'
import AdminCarsPage from '../Pages/Admin/AdminCarsPage'
import AdminBookingPage from '../Pages/Admin/AdminBookingPage'
import AdminUsersListPage from '../Pages/Admin/AdminUsersListPage'
import AdminAddCarPage from '../Pages/Admin/AdminAddCarPage'
import AdminCategoryPage from '../Pages/Admin/AdminCategoryPage'
import AdminVehicleEditpage from '../Pages/Admin/AdminVehicleEditpage'
import AdminHubsPage from '../Pages/Admin/AdminHubsPage'
import AdminAddHubPage from '../Pages/Admin/AdminAddHubPage'
import AdminViewandEditHubpage from '../Pages/Admin/AdminViewandEditHubpage'
import BookingDetailsPage from '../Pages/Admin/BookingDetailsPage'
function AdminRouter() {
  return (
    <Routes>
        <Route path='/login' element={<AdminLoginPage/>}/>
        <Route path='/' element={<AdminDashboardpage/>} />
        <Route path='/users' element={<AdminUsersListPage/>} />
        <Route path='/bookings' element = {<AdminBookingPage/>}/>
        <Route path='/viewcars' element = {<AdminCarsPage/>}/>
        <Route path='/addcars' element = {<AdminAddCarPage/>}/>
        <Route path='/categories' element = { <AdminCategoryPage/>}/> 
        <Route path='/editvehicle/:id' element={<AdminVehicleEditpage/>}/> 
        <Route path='/hubs' element={<AdminHubsPage/>}/>
        <Route path='/addhubs' element={<AdminAddHubPage/>}/>
        <Route path='/editandviewhub/:id' element={<AdminViewandEditHubpage/>}/>
        <Route path='/bookingDetails/:id' element={<BookingDetailsPage/>}/>
    </Routes>
  )
}

export default AdminRouter

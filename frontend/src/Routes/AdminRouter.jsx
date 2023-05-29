import React from 'react'
import { Routes ,Route } from 'react-router-dom'
import AdminLoginPage from '../Pages/Admin/AdminLoginPage'
import AdminDashboardpage from '../Pages/Admin/AdminDashboardpage'
import AdminCarsPage from '../Pages/Admin/AdminCarsPage'
import AdminBookingPage from '../Pages/Admin/AdminBookingPage'
import AdminUsersListPage from '../Pages/Admin/AdminUsersListPage'
import AdminFeedbackPage from '../Pages/Admin/AdminFeedbackPage'
import AdminAddCarPage from '../Pages/Admin/AdminAddCarPage'
import AdminCategoryPage from '../Pages/Admin/AdminCategoryPage'
function AdminRouter() {
  return (
    <Routes>
        <Route path='/login' element={<AdminLoginPage/>}/>
        <Route path='/' element={<AdminDashboardpage/>} />
        <Route path='/users' element={<AdminUsersListPage/>} />
        <Route path='/bookings' element = {<AdminBookingPage/>}/>
        <Route path='/viewcars' element = {<AdminCarsPage/>}/>
        <Route path='/addcars' element = {<AdminAddCarPage/>}/>
        <Route path='/feedback' element = {<AdminFeedbackPage/>}/>
        <Route path='/categories' element = { <AdminCategoryPage/>}/>

        
    </Routes>
  )
}

export default AdminRouter

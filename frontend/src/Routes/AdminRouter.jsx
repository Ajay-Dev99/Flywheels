import React from 'react'
import { Routes ,Route } from 'react-router-dom'
import AdminLoginPage from '../Pages/Admin/AdminLoginPage'
import AdminSidebar from '../Components/Admin/AdminSidebar'
import UserList from '../Components/Admin/UserList'
function AdminRouter() {
  return (
    <Routes>
        <Route path='/login' element={<AdminLoginPage/>}/>
        <Route path='/side' element={<AdminSidebar/>} />
        <Route path='/users' element={<UserList/>} />
    </Routes>
  )
}

export default AdminRouter

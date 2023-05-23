import React from 'react'
import { Routes ,Route } from 'react-router-dom'
import AdminLoginPage from '../Pages/Admin/AdminLoginPage'
function AdminRouter() {
  return (
    <Routes>
        <Route path='/login' element={<AdminLoginPage/>}/>
    </Routes>
  )
}

export default AdminRouter

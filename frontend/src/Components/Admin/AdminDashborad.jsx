import React from 'react'
import AdminSidebar from './AdminSidebar'

function AdminDashborad() {
  return (
    <div>
      <AdminSidebar/>
      <div className="p-4 sm:ml-64">
    <div className='mt-3 ms-4'><h1 className='font-bold text-xl'>Dash Board</h1></div>
    <div className='flex flex-col md:flex-row justify-center mt-5'>
      <div className='text-center py-7 md:py-9 px-9 md:px-24 m-3 bg-[#0079FF] text-white font-bold rounded-md'><p>15</p> <p>Total Users</p></div>
      <div className='text-center py-7 md:py-9 px-9 md:px-24 m-3 bg-[#00DFA2] text-white font-bold rounded-md'><p>15</p> <p>Total Vehicle</p></div>
      <div className='text-center py-7 md:py-9 px-9 md:px-24 m-3 bg-[#FF0060] text-white font-bold rounded-md'><p>15</p> <p>Total Bookings</p></div>
    </div>
      </div>
      
    </div>
  )
}

export default AdminDashborad

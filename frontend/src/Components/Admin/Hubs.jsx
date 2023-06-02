import React from 'react'
import AdminSidebar from './AdminSidebar'
import { useNavigate } from 'react-router-dom'

function Hubs() {
    const navigate = useNavigate()
  return (
    <div>
        <AdminSidebar/>
        <div className='p-2 md:p-4 sm:ml-64'>
        <div className='flex justify-between  md:py-4  md:px-24 mt-7'>
          <div className='mt-1.5'>
            <h1 className='font-semibold text-lg'>HUBS</h1>
          </div>
          <div>
            <button onClick={() => navigate("/admin/addhubs")} className='bg-[#368E88] p-2 sm:text-sm md:p-3 text-white md:font-medium rounded-md shadow-[#8a8080] shadow-md'>ADD HUBS</button>
          </div>
        </div>

        </div>
        
    </div>
  )
}

export default Hubs
import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { PieChart, Pie, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Area, Bar } from 'recharts';
import { toast } from 'react-toastify';
import { AdminDashboard } from '../../Services/AdminApi';

function AdminDashborad() {
  const [bookingData, setBookingData] = useState([])
  const [TotalUser,setTotalUser] = useState()
  const [Totalvehicle,setTotalVehicle] = useState()
  const [TotalOrders,setTotalOrder] = useState()
 


  useEffect(() => {
    try {
      AdminDashboard().then((response) => {
        try {
          console.log(response.data, "response");
          if (response.data.status) {
            setBookingData(response.data.bookingCountPerDay)
            setTotalUser(response.data.totalUser)
            setTotalVehicle(response.data.totalVehicle)
            setTotalOrder(response.data.totalOrders)
          }
        } catch (error) {

        }
      })
    } catch (error) {
      toast(error.message)
    }
  }, [])

  return (
    <div>
      <AdminSidebar />
      <div className="p-4 sm:ml-64">
        <div className='mt-3 ms-4'><h1 className='font-bold text-xl'>Dash Board</h1></div>
        <div className='flex flex-col md:flex-row justify-center mt-5'>
          { TotalUser && <div className='text-center py-7 md:py-9 px-9 md:px-24 m-3 bg-[#0079FF] text-white font-bold rounded-md text-xl'><p>{TotalUser}</p> <p>Total Users</p></div>}
          {Totalvehicle && <div className='text-center py-7 md:py-9 px-9 md:px-24 m-3 bg-[#00DFA2] text-white font-bold rounded-md text-xl'><p>{Totalvehicle}</p> <p>Total Vehicle</p></div>}
          {TotalOrders && <div className='text-center py-7 md:py-9 px-9 md:px-24 m-3 bg-[#FF0060] text-white font-bold rounded-md text-xl'><p>{TotalOrders}</p> <p>Total Bookings</p></div>}
        </div>

       {  bookingData && <div>
        <div className='flex justify-evenly md:flex-row flex-col  items-center mt-24  container'>
           <div>
            <div className='flex justify-center items-center mb-7'>  <h1 className='font-bold text-xl'>Booking Chart</h1> </div>
           <ComposedChart className='block md:hidden' width={350} height={250} data={bookingData}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid stroke="#f5f5f5" />
              <Area type="monotone" dataKey="count" fill="#8884d8" stroke="#8884d8" />
              <Bar dataKey="count" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="uv" stroke="#ff7300" />
            </ComposedChart>
            <ComposedChart className='hidden md:block' width={750} height={250} data={bookingData}>
            <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid stroke="#f5f5f5" />
              <Area type="monotone" dataKey="count" fill="#8884d8" stroke="#8884d8" />
              <Bar dataKey="count" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="count" stroke="#ff7300" />
            </ComposedChart>
           </div>
           <div>
            ghghffg
           </div>
        </div>
          </div>}
      </div>
    </div>
  )
}

export default AdminDashborad

import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { getbookingAPI } from '../../Services/AdminApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { BiSortDown } from 'react-icons/bi'


function Bookings() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState()
  useEffect(() => {
    try {
      getbookingAPI().then((response) => {
        if (response.data.status) {
          setOrders(response.data.bookings)
        } else {
          toast(response.data.message)
        }
      })
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
    <div>
      <AdminSidebar />
      <div className='p-4  sm:ml-64'>
        <div>
          <h1 className='font-bold'>BOOKINGS</h1>
          <div className='flex justify-end me-9'>
            <button  className=" bg-[#C0C0C0] focus:ring-4 focus:outline-black  font-medium rounded-lg  px-7 py-1.5 text-center inline-flex items-center text-gray-700 text-md" >Filter Bookings <BiSortDown className="w-4 h-4 ml-2 mt-1 font-bold text-gray-700" /></button>
          </div>
        </div>
        {orders && <div className="relative overflow-x-auto mt-10">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  VEHICLE
                </th>
                <th scope="col" className="px-6 py-3">
                  USER NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  PICKING UP DATE
                </th>
                <th scope="col" className="px-6 py-3">
                  DROPPING DATE
                </th>
                <th scope="col" className="px-6 py-3">

                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (

                <tr key={order._id} className={order.cancelStatus ? "bg-red-200" : "bg-white border-b"}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {order.vehicle_id.brand},{order.vehicle_id.modelname}
                  </th>
                  <td className="px-6 py-4">{order.user_id.name}</td>
                  <td className="px-6 py-4">{order.fromDate}</td>
                  <td className="px-6 py-4">{order.toDate}</td>
                  <td className="px-6 py-4"><button onClick={() => navigate(`/admin/bookingDetails/${order._id}`)} className='px-2 py-1 bg-[#358E88] text-white rounded-md text-sm font-semibold'> VIEW</button></td>
                </tr>))}
            </tbody>
          </table>
        </div>}
      </div>

    </div>
  )
}

export default Bookings
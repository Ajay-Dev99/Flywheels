import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { OrderFilterAPI, getbookingAPI } from '../../Services/AdminApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { BiSortDown, BiRefresh } from 'react-icons/bi'


function Bookings() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState()
  const [filter, setFilter] = useState(false)

  const orderList = () => {
    getbookingAPI().then((response) => {
      if (response.data.status) {
        setOrders(response.data.bookings)
      } else {
        toast(response.data.message)
      }
    })
  }
  useEffect(() => {
    try {
      orderList()
    } catch (error) {
      console.log(error);
    }
  }, [])

  const filterOrders = async (key) => {
    try {
      OrderFilterAPI(key).then((response) => {
        setFilter(false)
        if (response.data.status) {
          setOrders(response.data.bookings)
        } else {
          toast.error(response.data.message)
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <AdminSidebar />
      <div className='p-4  sm:ml-64'>
        <div>
          <h1 className='font-bold'>BOOKINGS</h1>
          <div className='flex justify-end me-9 relative px-5  '>

            <div className='flex justify-center items-center space-x-2'>
              <button onClick={() => setFilter(!filter)} className=" bg-[#C0C0C0] focus:ring-4 focus:outline-black  font-medium rounded-lg  px-7 py-1.5 text-center inline-flex items-center text-gray-700 text-md" >Filter Bookings <BiSortDown className="w-4 h-4 ml-2 mt-1 font-bold text-gray-700" /></button>
              <button onClick={() => { orderList() }}>  <BiRefresh className='w-9 h-9'></BiRefresh> </button>
            </div>
            {filter && <div className="z-50 bg-[#ffffff] divide-y divide-gray-100  rounded-lg shadow w-44 absolute top-full right-5 mt-1 transform translate-x-0 md:translate-x-0  md:w-auto md:mt-1 ">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 space-y-0" aria-labelledby="dropdownDefaultButton">
                <p className='text-center bg-gray-400 text-md text-white py-2 font-bold my-3'>Status</p>
                <li className='hover:bg-gray-400 hover:text-white px-14 py-2 bg-[#ffff] ' onClick={() => filterOrders('orderPlaced')}>
                  <button>Order Placed</button>
                </li>
                <li className='hover:bg-gray-400 hover:text-white  px-14 py-2 bg-[#ffff]' onClick={() => filterOrders('pickedup')} >
                  <button>PickedUp</button>
                </li>
                <li className='hover:bg-gray-400 hover:text-white px-14 py-2 bg-[#ffff]' onClick={() => filterOrders('dropedoff')}>
                  <button>DroppedOff</button>
                </li>
                <li className='hover:bg-gray-400 hover:text-white px-14 py-2 bg-[#ffff] ' onClick={() => filterOrders('cancelled')} >
                  <button>Cancelled</button>
                </li>
              </ul>
            </div>}

          </div>
        </div>
        {orders && <div className="relative overflow-x-auto mt-10 ">
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
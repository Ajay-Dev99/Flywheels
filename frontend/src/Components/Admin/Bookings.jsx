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
      console.log(response.data);
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
        {orders ? <div>
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
        </div> : <div role="status " className='flex justify-center h-screen items-center'>
          <svg aria-hidden="true" className="w-10 h-10 mr-2  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>}
      </div>

    </div>
  )
}

export default Bookings
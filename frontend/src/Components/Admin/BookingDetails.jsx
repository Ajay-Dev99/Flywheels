import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { useParams } from 'react-router-dom'
import { getOrderDetailsAPI } from '../../Services/AdminApi'
import { toast } from 'react-toastify'

function BookingDetails() {
  const { id } = useParams()
  const [order, setOrder] = useState([])
  useEffect(() => {
    try {
      getOrderDetailsAPI(id).then((response) => {
        console.log(response.data, "data in order details");
        if (response.data.status) {
          setOrder(response.data.order)
        } else {
          toast(response.data.message)
        }
      })
    } catch (error) {
      console.log(error);
    }
  }, [id])
  return (
    <div>
      <AdminSidebar />
      <div className='p-4  sm:ml-64'>
        {order && 

         <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
          <div className="flex justify-start item-start space-y-2 flex-col">
            <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
              Order #{order._id}
            </h1>
            <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
              {order.booked_At}
            </p>
          </div>
          <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
              <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <p className="text-lg md:text-xl mb-3 dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                  Customer’s Order
                </p>
                { order.vehicle_id &&  <div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full">
                <div className="w-full md:w-40">
                    <img
                      className="w-full "
                      src={`${process.env.REACT_APP_BASE_URL}/${order.vehicle_id.image_url[0]}`} 
                      alt="dress"
                    />
                  </div>
                  <div className="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                      <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                       {order.vehicle_id.brand},{order.vehicle_id.modelname}
                      </h3>
                      <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-sm dark:text-white leading-none text-gray-800">
                          <span className="dark:text-gray-400 text-gray-300">
                            No:{" "}
                          </span>{" "}
                          {order.vehicle_id.vehiclenumber}
                        </p>
                        <p className="text-sm dark:text-white leading-none text-gray-800">
                          <span className="dark:text-gray-400 text-gray-300">
                            Fuel Type:{" "}
                          </span>{" "}
                          {order.vehicle_id.fueltype}
                          
                        </p>
                        <p className="text-sm dark:text-white leading-none text-gray-800">
                          <span className="dark:text-gray-400 text-gray-300">
                            Transmission:{" "}
                          </span>{" "}
                          {order.vehicle_id.transmissiontype}

                        </p>
                        <p className="text-sm dark:text-white leading-none text-gray-800">
                          <span className="dark:text-gray-400 text-gray-300">
                            Model:{" "}
                          </span>{" "}
                          {order.vehicle_id.modelyear}

                        </p>
                      </div>
                    </div>
                  </div>
                </div> }
              </div>
              <div className="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                  <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                    Summary
                  </h3>
                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    {/* <div className="flex justify-between w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                        Subtotal
                      </p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        {order.amount}
                      </p>
                    </div> */}
                    <div className="flex justify-between w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                      PICKING UP DATE
                      </p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        {order.fromDate}
                      </p>
                    </div>
                    <div className="flex justify-between w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                      PICKING UP TIME
                      </p>
                      <p className="text-base d leading-4 text-black">
                        {order.deliveryTime}
                      </p>
                    </div>
                    <div className="flex justify-between w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                      DROPPING OFF DATE
                      </p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        {order.toDate}
                      </p>
                    </div>
                    <div className="flex justify-between w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                      PAYMENT ID
                      </p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        {order.payment_id}
                      </p>
                    </div>
                    <div className="flex justify-between w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                        DELIVERY TYPE
                      </p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        {order.deliveryType}
                      </p>
                    </div>
                  { (order.deliveryType === 'pickup') ? <div className="flex justify-between w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                        PICK UP FROM HUB
                      </p>
                     { (order.Hub!=="") && <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        {order.Hub.district}
                      </p>}
                    </div> : <div className="flex justify-between w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                       Delivery Address
                      </p>
                    { order.deliveryDetails && <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                    {order.deliveryDetails[0].address},
                     {order.deliveryDetails[0].homeTown},
                     {order.deliveryDetails[0].district},
                     {order.deliveryDetails[0].pincode},
                      </p>}
                    </div> }
                   
                    
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                      Total
                    </p>
                    <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                    ₹ {order.amount}
                    </p>
                  </div>
                </div>

              </div>
            </div>
        {order.user_id &&    <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
              <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                Customer
              </h3>
              <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                <div className="flex flex-col justify-start items-start flex-shrink-0">
                  <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                    <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                    <div className="flex justify-start items-start flex-col space-y-2">
                      <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                        {order.user_id.name}
                      </p>
                      <p className="cursor-pointer text-sm leading-5 ">
                    {order.user_id.email}
                    </p>
                    <p className="cursor-pointer text-sm leading-5 ">
                    {order.user_id.phone_number}
                    </p>
                     
                    </div>
                  </div>
                  <div className="flex justify-center flex-col text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                    <img
                      className="w-9 mb-2"
                      src="/images/location.png"
                    />
                    
                   
                    <p className="cursor-pointer text-sm leading-5 ">
                    {order.deliveryDetails[0].address}
                    

                    </p>
                    <p className="cursor-pointer text-sm leading-5 ">
                    {order.deliveryDetails[0].homeTown}

                    </p>
                    <p className="cursor-pointer text-sm leading-5 ">
                    {order.deliveryDetails[0].district}


                    </p>
                    <p className="cursor-pointer text-sm leading-5 ">
                    {order.deliveryDetails[0].pincode}
                   

                    </p>
                  </div>
                </div>
              </div>
            </div>}
          </div>
        </div>}
      </div>
    </div>
  )
}

export default BookingDetails

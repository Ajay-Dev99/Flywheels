import React, { useEffect, useState } from 'react'
import Header from './userHeader'
import { toast } from 'react-toastify'
import { bookingDetailsApi, cancelOrder } from '../../Services/UserApi'
import Userfooter from './Userfooter'
import { TiTick } from 'react-icons/ti'
import { getOrderDetailsAPI } from '../../Services/AdminApi'



function UserBookings() {

  const steps = ["Order Placed", "Picked Up", "Dropped Off"];
  const [currentStep, setCurrentStep] = useState({});
  const [complete, setComplete] = useState(false);
  const [bookings, setBookings] = useState("")
  const [cancel, setCancel] = useState({})
  useEffect(() => {
    try {
      bookingDetailsApi().then((response) => {
        if (response.data.status) {
          setBookings(response.data.bookings)
        }
      })

    } catch (error) {
      toast(error.message)
    }
  }, [bookings])

  const canceluserOrder = (bookingId)=>{
    try {
      cancelOrder(bookingId).then((response)=>{
        console.log(response.data)
        if(response.data.status){
          const updatedBookings = bookings.map((booking)=>{
            if(booking._id === bookingId){
              booking = response.data.cancelledBooking
            }
            return booking
          }) 
          setBookings(updatedBookings)
          toast(response.data.message)
        }
        
      })
    } catch (error) {
      toast(error.message)
    }
  }

  const viewStatus = async (id) => {
    setCancel(false)
    setCurrentStep(false)
    getOrderDetailsAPI(id).then((response) => {
      if (response.data.status) {
        const order = response.data.order
        let idx;
        if (order.status === "orderPlaced") {
          setCancel({ status: true, orderId: id })
          idx = 1;
        } else if (order.status === "pickedup") {
          idx = 2;
        } else {
          idx = 3;
        }
        setCurrentStep({ idx: idx + 1, orderId: id })

      } else {
        toast(response.data.message)
      }
    })
  }
  return (
    <div >
      <Header />
      <div className={bookings.length>0 ?'bg-[#577590] py-5': 'bg-white py-5 h-screen flex justify-center items-center'}>
       { bookings.length>0 && <div className='mt-5'>
          <div className='bg-[#57758f] font-bold text-lg  text-white text-center my-2 py-2'>BOOKINGS</div>
        </div>}
        {bookings.length>0 ? bookings.map((booking) => (

          <div key={booking._id} className=" px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto my-5 ">

            <div className=" flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0  ">
              <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full rounded-md">
                  <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                { booking.vehicle_id &&   <div className=" ">
                      <img
                        className=" w-96 "
                        src={`${process.env.REACT_APP_BASE_URL}/${booking.vehicle_id.image_url[0]}`}

                      />
                    </div>}
                    <div className="border-b pb-2 border-gray-200 md:flex-row flex-col flex justify-center items-start w-full  space-y-4 md:space-y-0">
                      {booking.vehicle_id && <div className="w-full px-3 flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                          {booking.vehicle_id.modelname}
                        </h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-300">
                              number:{" "}
                            </span>{" "}
                            {booking.vehicle_id.vehiclenumber}
                          </p>
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-300">
                              fuel:{" "}
                            </span>{" "}
                            {booking.vehicle_id.fueltype}
                          </p>
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-300">
                              Transmission:{" "}
                            </span>{" "}
                            {booking.vehicle_id.transmissiontype}
                          </p>
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-300">
                              model:{" "}
                            </span>{" "}
                            {booking.vehicle_id.modelyear}
                          </p>
                        </div>
                       {!booking.cancelStatus && <div className='flex justify-center' onClick={() => viewStatus(booking._id)}>
                          <p className='text-blue-500 underline '> ViewStatus</p>
                        </div>}
                       {booking.cancelStatus ? <div className='text-red-600'>Order cancelled</div>: <div className='flex flex-col justify-center items-center p-3'>
                          {currentStep.orderId === booking._id &&
                            <div className="flex justify-between">
                              {steps?.map((step, i) => (
                                <div
                                  key={i}
                                  className={`step-item ${currentStep.idx === i + 1 && "active"} ${(i + 1 < currentStep.idx || complete) && "complete"
                                    } `}
                                >
                                  <div className="step" onClick={() => {
                                  }}>
                                    {i + 1 < currentStep.idx || complete ? <TiTick size={24} /> : i + 1}
                                  </div>
                                  <p className="text-gray-500">{step}</p>
                                </div>
                              ))}
                            </div>
                          }

                          {
                          cancel.status && cancel.orderId === booking._id && 
                          <div className='flex justify-center my-2 '><button onClick={()=>{canceluserOrder(booking._id)}} className='px-4 py-2 bg-black text-white'>Cancel Order</button></div>
                          }
                        </div>}








                      </div>}


                      <div className="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col   w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                            Summary
                          </h3>
                          <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 ">

                            <div className="flex justify-between w-full">
                              <p className="text-base dark:text-white leading-4 text-gray-800">
                                PICKING UP DATE
                              </p>
                              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                                {booking.fromDate}
                              </p>
                            </div>
                            <div className="flex justify-between w-full">
                              <p className="text-base dark:text-white leading-4 text-gray-800">
                                PICKING UP TIME
                              </p>
                              <p className="text-base d leading-4 text-black">
                                {booking.deliveryTime}
                              </p>
                            </div>
                            <div className="flex justify-between w-full">
                              <p className="text-base dark:text-white leading-4 text-gray-800">
                                DROPPING OFF DATE
                              </p>
                              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                                {booking.toDate}
                              </p>
                            </div>
                            <div className="flex justify-between w-full">
                              <p className="text-base dark:text-white leading-4 text-gray-800">
                                PAYMENT ID
                              </p>
                              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                                {booking.payment_id}
                              </p>
                            </div>
                            <div className="flex justify-between w-full">
                              <p className="text-base dark:text-white leading-4 text-gray-800">
                                DELIVERY TYPE
                              </p>
                              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                                {booking.deliveryType}
                              </p>
                            </div>
                            {(booking.deliveryType === 'pickup') ? <div className="flex justify-between w-full">
                              <p className="text-base dark:text-white leading-4 text-gray-800">
                                PICK UP FROM HUB
                              </p>
                              {(booking.Hub !== "") && <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                                {booking.Hub.district}
                              </p>}
                            </div> : <div className="flex justify-between w-full">
                              <p className="text-base dark:text-white leading-4 text-gray-800">
                                Delivery Address
                              </p>
                              {booking.deliveryDetails && <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                                {booking.deliveryDetails[0].address},
                                {booking.deliveryDetails[0].homeTown},
                                {booking.deliveryDetails[0].district},
                                {booking.deliveryDetails[0].pincode},
                              </p>}
                            </div>}


                          </div>
                          <div className="flex justify-between items-center w-full ">
                            <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                              Total
                            </p>
                            <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                              ₹ {booking.amount}
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>)):<div className='flex justify-center items-center bg-white'>
           NO BOOKINGS
        
            </div>}

      </div>
      <Userfooter />
    </div>
  )
}

export default UserBookings

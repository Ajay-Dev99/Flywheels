import React, { useEffect, useState } from 'react'
import Header from './userHeader'
import { toast } from 'react-toastify'
import { bookingDetailsApi, cancelOrder } from '../../Services/UserApi'
import Userfooter from './Userfooter'
import { TiTick } from 'react-icons/ti'
import { getOrderDetailsAPI } from '../../Services/UserApi'
import { useNavigate } from 'react-router-dom'



function UserBookings() {
  const navigate = useNavigate()
  const steps = ["Order Placed", "Picked Up", "Dropped Off"];
  const [currentStep, setCurrentStep] = useState({});
  const [complete, setComplete] = useState(false);
  const [bookings, setBookings] = useState("")
  const [cancel, setCancel] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [orderId, setOrderId] = useState("")
  const [cancelled, setCancelled] = useState(false)
  const [noBookings, setNoBookings] = useState(false)
  useEffect(() => {
    try {
      const token = localStorage.getItem("jwt")
      if (!token) {
        navigate("/login")
      }
      bookingDetailsApi().then((response) => {
        if (response.data.status) {
          setBookings(response.data.bookings)
        } else {
          setNoBookings(true)
        }
      })

    } catch (error) {
      toast(error.message)
    }
  }, [cancelled])

  const handleCancel = (orderId) => {
    setShowModal(!showModal)
    setOrderId(orderId)
  }

  const canceluserOrder = () => {
    try {
      cancelOrder(orderId).then((response) => {
        if (response.data.status) {
          setCancelled(true)
          const updatedBookings = bookings.map((booking) => {
            if (booking._id === orderId) {
              booking = response.data.cancelledBooking
            }
            return booking
          })
          setBookings(updatedBookings)
          toast(response.data.message)
          setShowModal(false)
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
      <div className={bookings.length > 0 ? 'bg-[#577590] py-5' : 'bg-white py-5 h-screen flex justify-center items-center'}>
        {bookings.length > 0 && <div className='mt-5'>
          <div className='bg-[#57758f] font-bold text-lg  text-white text-center my-2 py-2'>BOOKINGS</div>
        </div>}
        {bookings.length > 0 ? bookings.map((booking) => (

          <div key={booking._id} className=" px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto my-5 ">

            <div className=" flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0  ">
              <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full rounded-md">
                  <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                    {booking.vehicle_id && <div className=" ">
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
                        {booking.cancelStatus ? <div className='text-red-600'>Order cancelled</div> : <div className='flex flex-col justify-center items-center p-3'>
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
                            <div className='flex justify-center my-2 '><button onClick={() => { handleCancel(booking._id) }} className='px-4 py-2 bg-black text-white'>Cancel Order</button></div>
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
          </div>)) : (!noBookings && (<div role="status " className='flex justify-center h-screen items-center'>
            <svg aria-hidden="true" className="w-10 h-10 mr-2  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>))}
        {noBookings && <div className='flex justify-center items-center bg-white'>
          NO BOOKINGS

        </div>}
        {showModal && <div id="popup-modal" className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button type="button" onClick={() => setShowModal(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure ?</h3>
                <button onClick={() => canceluserOrder()} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                  Yes, I'm sure
                </button>
                <button data-modal-hide="popup-modal" type="button" onClick={() => setShowModal(false)} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
              </div>
            </div>
          </div>
        </div>}


        {cancelled && <div id="popup-modal" className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

              <div className="p-6 text-center">
                <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Your order was successfully cancelled.The money will be returned within 3 business days.To report a problem, dial 000000000.</h3>
                <button onClick={() => setCancelled(false)} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-md inline-flex items-center px-5 py-2.5 text-center mr-2">
                  OK
                </button>

              </div>
            </div>
          </div>
        </div>}

      </div>
      <Userfooter />
    </div>
  )
}

export default UserBookings

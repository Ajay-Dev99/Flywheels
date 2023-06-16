import React, { useEffect, useState } from 'react'
import Header from './userHeader'
import { useNavigate, useParams } from 'react-router-dom'
import { PaymentDetailsApi, orderApi, verifyPayment } from '../../Services/UserApi'
import useRazorpay from "react-razorpay";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function Payment() {
    const user = useSelector((state) => state.user.value)
    const Razorpay = useRazorpay();
    const navigate = useNavigate()
    const { id } = useParams()
    const [bookingDetails, setBookingDetails] = useState()
    const [vehicle, setVehicle] = useState()
    const [totalAmount, setTOtalAmount] = useState()
    const [numberOfDays, setNumberOfDays] = useState()
    const [hubDetails, setHubDetails] = useState()
    useEffect(() => {
        try {
            PaymentDetailsApi().then((response) => {
                if (response.data.status) {
                    setBookingDetails(response.data.bookingDeatails)
                    setVehicle(response.data.vehicle)
                    setTOtalAmount(response.data.totalAmount);
                    setNumberOfDays(response.data.numberOfDays);
                    setHubDetails(response.data.hubDetails)
                } else {
                    navigate("/")
                }
            })
        } catch (error) {

        }
    }, [])

    const initPayment = async (data) => {
        const bookingData = bookingDetails
        const vehicleId = vehicle._id
        const amount = data.amount
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            amount: data.amount,
            name: `${vehicle.brand},${vehicle.modelname}`,
            currency: data.currency,
            order_id: data.id,
            handler: async (response) => {

                try {
                    const { data } = await verifyPayment(response, bookingData, vehicleId, amount)
                    const orderId = data.orderId
                    toast.success('Order successfully placed', {
                        autoClose: 3000, // Toast display duration in milliseconds
                        position: toast.POSITION.TOP_LEFT, // Set the position to full width
                        className: 'toast-message', // Custom CSS class for styling the toast
                    });
                    setBookingDetails(null)
                    setVehicle(null)
                    setTOtalAmount(null);
                    setNumberOfDays(null);
                    setHubDetails(null)
                    navigate(`/ordersuccess/${orderId}`)
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: '#368E88'
            }
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
    }


    const handlePayment = async () => {
        try {
            const { data } = await orderApi({ amount: totalAmount })
            initPayment(data.order)
        } catch (error) {

        }
    }

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                <a href="#" className="text-2xl font-bold text-gray-800">Flywheels</a>

            </div>
            {bookingDetails && <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                <div className="px-4 pt-8">
                    <p className="text-xl font-medium">Order Summary</p>
                    <p className="text-gray-400">Check your items.</p>
                    {vehicle && <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                        <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                            <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={`${process.env.REACT_APP_BASE_URL}/${vehicle.image_url[0]}`} alt="" />
                            <div className="flex w-full flex-col px-4 py-4">
                                <span className="font-semibold">{vehicle.brand} {vehicle.modelname} </span>
                                <span className="float-right text-gray-400">{vehicle.modelyear}</span>
                                <span className="float-right text-gray-400">{vehicle.vehiclenumber}</span>
                                <span className="float-right text-gray-400">{vehicle.fueltype}</span>
                            </div>
                        </div>
                    </div>}

                    <p className="mt-8 text-lg font-medium">Delivery Methods</p>


                    {bookingDetails && <div className="relative">
                        <span className=" absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                        <label className=" peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">

                            <div className="ml-5">
                                <span className="mt-2 font-semibold">{bookingDetails.deliverytype}</span>
                                {hubDetails && <div className='flex'>
                                    <span className="mt-2 font-semibold">{hubDetails.hubName},</span>
                                    <span className="mt-2 font-semibold">{hubDetails.buildingName},</span>
                                    <span className="mt-2 font-semibold">{hubDetails.district},</span>
                                    <span className="mt-2 font-semibold">{hubDetails.street},</span>
                                    <span className="mt-2 font-semibold">{hubDetails.pincode}</span>

                                </div>}
                            </div>
                        </label>
                    </div>}
                </div>
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Order Details</p>

                    {bookingDetails && <div className="">
                        <label htmlFor="" className="mt-4 mb-2 block text-sm font-medium">UserName</label>
                        <div className="relative">
                            <input type="text" id="email" name="email" className="w-full placeholder-black font-bold rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder={`${bookingDetails.username}`} disabled />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">

                            </div>
                        </div>
                        <label htmlFor="" className="mt-4 mb-2 block text-sm font-medium">Phone Number</label>
                        <div className="relative">
                            <input type="text" id="email" name="email" className="w-full placeholder-black font-bold rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder={`${bookingDetails.phonenumber}`} disabled />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">

                            </div>
                        </div>
                        <label htmlFor="" className="mt-4 mb-2 block text-sm font-medium">From Date</label>
                        <div className="relative">
                            <input type="text" id="email" name="email" className="w-full placeholder-black font-bold rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder={`${bookingDetails.fromDate}`} disabled />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">

                            </div>
                        </div>
                        <label htmlFor="" className="mt-4 mb-2 block text-sm font-medium">To Date</label>
                        <div className="relative">
                            <input type="text" id="email" name="email" className="w-full placeholder-black font-bold rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder={`${bookingDetails.toDate}`} disabled />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">

                            </div>
                        </div>
                        <label htmlFor="" className="mt-4 mb-2 block text-sm font-medium">Time</label>
                        <div className="relative">
                            <input type="text" id="email" name="email" className="w-full placeholder-black font-bold rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder={`${bookingDetails.deliveryTime}`} disabled />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">

                            </div>
                        </div>
                        <label htmlFor="" className="mt-4 mb-2 block text-sm font-medium">Number Of Days</label>
                        {numberOfDays && <div className="relative">
                            <input type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 placeholder-black font-bold" placeholder={`${numberOfDays}`} disabled />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">

                            </div>
                        </div>}





                        {totalAmount && <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Total</p>
                            <p className="text-2xl font-semibold text-gray-900">₹{totalAmount}</p>
                        </div>}
                    </div>}
                    <button onClick={handlePayment} className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
                </div>
            </div>}

        </div>
    )
}

export default Payment

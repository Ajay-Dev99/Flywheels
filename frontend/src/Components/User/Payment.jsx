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
    const [isLoading, setIsLoading] = useState(false)
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
        setIsLoading(false)
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
                        position: toast.POSITION.TOP_CENTER, // Set the position to full width

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
            setIsLoading(true)
            const { data } = await orderApi({ amount: totalAmount })
            initPayment(data.order)
        } catch (error) {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                <a href="#" className="text-2xl font-bold text-gray-800">Flywheels</a>

            </div>
            {bookingDetails ? <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
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
                    <button onClick={!isLoading ? handlePayment : undefined} type='button' className={`${isLoading ? 'cursor-not-allowed opacity-50' : ''
                        } mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white`}>  {isLoading ? (
                            <div className='flex justify-center'>
                                <svg
                                    className="animate-spin flex text-center h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zm10 3.647A7.962 7.962 0 0120 12h-4c0 3.042-1.135 5.824-3 7.938l-3-1.647z"
                                    />
                                </svg>
                            </div>
                        ) : (
                            'Place Order'
                        )}</button>
                </div>
            </div> : <div role="status " className='flex justify-center h-screen items-center'>
                <svg aria-hidden="true" className="w-10 h-10 mr-2  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>}

        </div>
    )
}

export default Payment

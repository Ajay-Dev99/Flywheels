import React, { useEffect, useState } from 'react'
import Header from './userHeader'
import Userfooter from './Userfooter'
import { useNavigate, useParams } from 'react-router-dom'
import { getOrderDetailsAPI } from '../../Services/AdminApi'
import { toast } from 'react-toastify'

function OrderSuccessful() {
    const navigate = useNavigate("")
    const { id } = useParams()
    const [order, setOrder] = useState(false)
    useEffect(() => {
        try {
            getOrderDetailsAPI(id).then((response) => {
                setOrder(response.data.order)
            })
        } catch (error) {
            toast.error(error.message)
        }
    }, [])
    return (
        <div>
            <div>
                <Header />
            </div>

            {order ? <div>
                <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                    <div className="flex items-center justify-center mb-7">
                        <div>
                            <div className="flex flex-col items-center space-y-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-green-600 w-28 h-28"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <h1 className="text-4xl font-bold">Thank You !</h1>
                                <p>Your Order Placed Successfully</p>

                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                            {order && <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                                    Your Booking
                                </p>
                                <p>
                                    Booking ID:#{order._id}
                                </p>
                                <div className="mt-6 md:mt-0  flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full">
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
                                </div>
                            </div>}
                            <div className="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-[#ffe6e6] dark:bg-gray-800 space-y-6 mb-3 rounded-lg">
                                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                                        Summary
                                    </h3>
                                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">

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
                                        {(order.deliveryType === 'pickup') ? <div className="flex justify-between w-full">
                                            <p className="text-base dark:text-white leading-4 text-gray-800">
                                                PICK UP FROM HUB
                                            </p>
                                            {(order.Hub !== "") && <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                                                {order.Hub.district}
                                            </p>}
                                        </div> : <div className="flex justify-between w-full">
                                            <p className="text-base dark:text-white leading-4 text-gray-800">
                                                Delivery Address
                                            </p>
                                            {order.deliveryDetails && <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                                                {order.deliveryDetails[0].address},
                                                {order.deliveryDetails[0].homeTown},
                                                {order.deliveryDetails[0].district},
                                                {order.deliveryDetails[0].pincode},
                                            </p>}
                                        </div>}


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

                    </div>
                    <div className='flex justify-center items-center' onClick={() => navigate("/")}>
                        <div className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600  rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                                />
                            </svg>
                            <span className="text-sm font-medium" >Home</span>
                        </div>
                    </div>
                </div>
                <div>
                    <Userfooter />
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

export default OrderSuccessful

import React, { useEffect, useState } from 'react'
import Header from './userHeader'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { bookaCarAPi, bookingPage } from '../../Services/UserApi'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
];

function Bookacar() {
    const navigate = useNavigate()
    const [hub, setHub] = useState(false)
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const { id } = useParams()

    useEffect(() => {
        bookingPage(id).then((response) => {
            console.log(response.data);
            if (response.data.status) {
                setHub(response.data.vehicle.hub.district)
                formik.setValues({
                    hub: response.data.vehicle.hub._id
                })
            }
            else if (response.data.Blocked) {
                navigate("/login")
                toast.error(response.data.message)
            } else {
                navigate("/login")
                toast.warning(response.data.message)
            }
        })
    }, [id])

    const initialValues = {
        username: "",
        phonenumber: "",
        address: "",
        district: "",
        hometown: "",
        pincode: "",
        deliverytype: null,
        fromDate: "",
        toDate: "",
        deliveryTime: "",
        hub: ""

    }



    const onSubmit = async (values) => {
        const updatedValues = { ...values, deliveryTime: selectedTimeSlot };
        bookaCarAPi(updatedValues, id).then((response) => {
            if (response.data.status) {
                navigate(`/payment`)
            } else {
                toast.error(response.data.message, {
                    position: 'top-center'
                })
            }
        })
    };

    const validationSchema = Yup.object({
        username: Yup.string().required(),
        phonenumber: Yup.string().length(10, 'Phone number must be exactly 10 digits').matches(/^[0-9]+$/, 'Please enter a valid number').typeError('Please enter a valid number')
            .required('This field is required'),
        address: Yup.string().required(),
        district: Yup.string().required(),
        hometown: Yup.string().required(),
        pincode: Yup.number()
            .typeError('Please enter a valid number')
            .required('This field is required'),
        deliverytype: Yup.string().required("Please select an option"),
        fromDate: Yup.date().required("From Date is required"),
        toDate: Yup.date().required("To Date is required"),
        deliveryTime: Yup.string().required("Delivery Time is required"),
        // hub: Yup.string().when('deliverytype', {
        //     is: 'pickup',
        //     then: Yup.string().required('Hub selection is required')
        // })
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })
    return (
        <div>
            <Header />
            <div className='mt-8'>
                <div className='p-2 bg-[#358E88] flex justify-center text-white font-bold'>BOOK NOW</div>
            </div>
            <div className='xl:px-96  px-2 my-5'>
                <div className='xl:px-12 px-3 py-7 border border-gray-300 rounded-md shadow-md shadow-black'>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-6 ">
                            <label
                                htmlFor="username"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                USER NAME
                            </label>
                            <input
                                type="text"
                                name="username"
                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            />
                            {formik.touched.username && formik.errors.username ? <p className="text-sm text-red-600">{formik.errors.username}</p> : null}
                        </div>
                        <div className="mb-6 ">
                            <label
                                htmlFor="phonenumber"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                PHONE NUMBER
                            </label>
                            <input
                                type="number"
                                name="phonenumber"
                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phonenumber}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            />
                            {formik.touched.phonenumber && formik.errors.phonenumber ? <p className="text-sm text-red-600">{formik.errors.phonenumber}</p> : null}
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="address"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                ADDRESS
                            </label>
                            <input
                                type="text"
                                name='address'
                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required=""
                            />
                            {formik.touched.address && formik.errors.address ? <p className="text-sm text-red-600">{formik.errors.address}</p> : null}
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="district"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                DISTRICT
                            </label>
                            <input
                                type="text"
                                name='district'
                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.district}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required=""
                            />
                            {formik.touched.district && formik.errors.district ? <p className="text-sm text-red-600">{formik.errors.district}</p> : null}
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="hometown"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                HOME TOWN
                            </label>
                            <input
                                type="text"
                                name='hometown'
                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.hometown}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required=""
                            />
                            {formik.touched.hometown && formik.errors.hometown ? <p className="text-sm text-red-600">{formik.errors.hometown}</p> : null}
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="pincode"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                PINCODE
                            </label>
                            <input
                                type="number"
                                name='pincode'
                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.pincode}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required=""
                            />
                            {formik.touched.pincode && formik.errors.pincode ? <p className="text-sm text-red-600">{formik.errors.pincode}</p> : null}
                        </div>
                        <div className='mb-6'>
                            <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">DOCUMENT (please upload a valid document like adhar card or driving licence) </label>
                            {formik.touched.image && formik.errors.image ? <p className='text-sm text-red-600'>{formik.errors.image}</p> : null}
                            <input type="file" name="image" onChange={(e) => {
                                const file = e.currentTarget.files[0];
                                formik.setFieldValue('image', file)
                            }} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                        </div>

                        <p className=' uppercase text-[darkgray] mb-3'>Choose an Option</p>
                        <div className="flex items-center mb-4 mt-2">
                            <input
                                id="default-radio-1"
                                type="radio"
                                onChange={() => formik.setFieldValue('deliverytype', 'delivery')}
                                onBlur={formik.handleBlur}
                                // value="delivery"
                                name="deliverytype"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">DOOR DELIVERY</label>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="default-radio-2"
                                type="radio"
                                onChange={() => formik.setFieldValue('deliverytype', 'pickup')}
                                onBlur={formik.handleBlur}
                                // value="pickup"
                                name="deliverytype"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">PICK UP FROM HUB</label>
                        </div>
                        {formik.touched.deliverytype && formik.errors.deliverytype ? <p className="text-sm text-red-600">{formik.errors.deliverytype}</p> : null}

                        {!formik.values.deliverytype == "" && (
                            <div className='my-4 px-5 py-4 border rounded-md border-gray-500'>
                                {formik.values.deliverytype === 'pickup' && (
                                    <div className="mb-6">

                                        {/* {hubs && <select
                                            name="hub"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.hub}
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                            required
                                        >
                                            <option value="">Select a hub</option>

                                            {hubs.map((hub) => (
                                                <option key={hub._id} value={hub._id}>{hub.district}</option>
                                            ))}

                                        </select>
                                        } */}
                                        {hub &&

                                            <div className='flex justify-center items-center'>
                                               <p>  HUB:{hub}</p>
                                                  
                                               
                                                {/* <input type="text" placeholder={hub} name='hub'  className="shadow-sm bg-gray-50 border border-gray-300 text-black placeholder-black placeholder:text-lg text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   " disabled/> */}
                                            </div>}

                                    </div>
                                )}
                                <div className="mb-6">
                                    <label
                                        htmlFor="fromDate"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        From Date
                                    </label>
                                    <input
                                        type="date"
                                        name="fromDate"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.fromDate}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        required=""
                                    />
                                    {formik.touched.fromDate && formik.errors.fromDate ? (
                                        <p className="text-sm text-red-600">{formik.errors.fromDate}</p>
                                    ) : null}
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="toDate"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        To Date
                                    </label>
                                    <input
                                        type="date"
                                        name="toDate"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.toDate}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        required=""
                                    />
                                    {formik.touched.toDate && formik.errors.toDate ? (
                                        <p className="text-sm text-red-600">{formik.errors.toDate}</p>
                                    ) : null}
                                </div>
                                {/* <div className="mb-6">
                                    <label
                                        htmlFor="deliveryTime"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Delivery Time
                                    </label>
                                    <input
                                        type="text"
                                        name="deliveryTime"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.deliveryTime}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        required=""
                                    />
                                    {formik.touched.deliveryTime && formik.errors.deliveryTime ? (
                                        <p className="text-sm text-red-600">{formik.errors.deliveryTime}</p>
                                    ) : null}
                                </div> */}
                                <div className="mb-6">
                                    <label htmlFor="deliveryTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Delivery Time
                                    </label>
                                    <select
                                        name="deliveryTime"
                                        onChange={(e) => {
                                            setSelectedTimeSlot(e.target.value)
                                            formik.handleChange(e)
                                        }}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.deliveryTime}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        required=""
                                    >
                                        <option value="">Select a time slot</option>
                                        {timeSlots.map(slot => (
                                            <option key={slot} value={slot}>{slot}</option>
                                        ))}
                                    </select>
                                    {formik.touched.deliveryTime && formik.errors.deliveryTime ? (
                                        <p className="text-sm text-red-600">{formik.errors.deliveryTime}</p>
                                    ) : null}
                                </div>


                            </div>
                        )}
                        <div className='flex justify-end'>
                            <button
                                type="submit"
                                className="text-white bg-[#368E88] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                SUBMIT
                            </button>
                        </div>
                    </form>

                </div>
            </div>

        </div>
    )
}

export default Bookacar

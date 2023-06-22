import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { editHub, getHubDetails } from '../../Services/AdminApi'
import { toast } from 'react-toastify'

function AdminViewandEditHub() {
    const [previewImage, setPreviewImage] = useState()
    const navigate = useNavigate()

    const { id } = useParams()


    useEffect(() => {
        try {

            getHubDetails(id).then((response) => {
                if (response.data.status) {
                    const hub = response.data.hub
                    formik.setValues({
                        hubname: hub.hubName,
                        buildingname: hub.buildingName,
                        district: hub.district,
                        street: hub.street,
                        pincode: hub.pincode,
                        image: hub.imageURL
                    })
                }
            })
        } catch (error) {

        }
    }, [])

    const initialValues = {
        hubname: "",
        buildingname: "",
        district: "",
        street: "",
        pincode: "",
        image: ""

    }

    const onSubmit = (values) => {
        editHub(values, id).then((response) => {
            if (response.data.status) {
                toast.success(response.data.message)
                navigate("/admin/hubs")
            }
        })
    }

    const validationSchema = Yup.object({
        hubname: Yup.string().required(),
        buildingname: Yup.string().required(),
        district: Yup.string().required(),
        street: Yup.string().required(),
        pincode: Yup.number()
            .typeError('Please enter a valid number')
            .required('This field is required'),
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return (
        <div>
            <AdminSidebar />

            <div className='p-2 md:p-4 sm:ml-64'>
                <div className='my-7'>
                    <p className='font-bold'>ADD HUBS</p>
                </div>
                <div className='p-7 border border-gray-300 rounded-md'>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-6 ">
                            <label
                                htmlFor="hubname"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                HUB NAME
                            </label>
                            <input
                                type="text"
                                name="hubname"
                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.hubname}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            />
                            {formik.touched.hubname && formik.errors.hubname ? <p className="text-sm text-red-600">{formik.errors.hubname}</p> : null}
                        </div>
                        <div className="mb-6 ">
                            <label
                                htmlFor="buildingname"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                BUILDING NAME
                            </label>
                            <input
                                type="text"
                                name="buildingname"
                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.buildingname}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            />
                            {formik.touched.buildingname && formik.errors.buildingname ? <p className="text-sm text-red-600">{formik.errors.buildingname}</p> : null}
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
                                htmlFor="street"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                STREET
                            </label>
                            <input
                                type="text"
                                name='street'
                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.street}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required=""
                            />
                            {formik.touched.street && formik.errors.street ? <p className="text-sm text-red-600">{formik.errors.street}</p> : null}
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
                        {previewImage ? <div >
                            <img src={previewImage} className='max-h-60 w-full object-left object-contain' />
                        </div> : <div>
                            <img src={`${process.env.REACT_APP_BASE_URL}/${formik.values.image}`} alt="" className='max-h-60 w-full object-left object-contain' />
                        </div>}
                        <div className='mb-6'>
                            <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload an image</label>
                            {formik.touched.image && formik.errors.image ? <p className='text-sm text-red-600'>{formik.errors.image}</p> : null}
                            <input type="file" name="image" onChange={(e) => {
                                const file = e.currentTarget.files[0];
                                formik.setFieldValue('image', file)
                                setPreviewImage(URL.createObjectURL(file))
                            }} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                        </div>


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

export default AdminViewandEditHub

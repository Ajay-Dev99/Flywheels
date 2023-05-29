import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { adminAddCar, adminGetCategoryList } from '../../Services/AdminApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function AdminAddCar() {
    const [categories, setCategories] = useState()
    const navigate = useNavigate()

    useEffect(() => {

        adminGetCategoryList().then((response) => {
            if (response.data.status) {
                setCategories(response.data.categories)
            } else {
                toast.error(response.data.message, {
                    position: "top-center"
                })
            }
        })

    }, [])

    const initialValues = {
        modelname: "",
        brand: "",
        fueltype: "",
        transmissionType: "",
        TotalKm: "",
        rent30daysormore: "",
        rent10to20days: "",
        rentupto10days: "",
        vehiclenumber: "",
        category: "",
        image: ""

    }
    const onSubmit = async (values) => {
        // console.log(values);
        adminAddCar(values).then((response) => {
            if (response.data.status) {
                toast(response.data.message)
                navigate("/admin/viewcars")
            } else {
                toast.error(response.data.message, {
                    position: "top-center"
                })
            }
        })
    }

    const validationSchema = Yup.object().shape({
        modelname: Yup.string().required(),
        brand: Yup.string().required(),
        fueltype: Yup.string().required(),
        transmissionType: Yup.string().required(),
        TotalKm: Yup.number()
            .typeError('Please enter a valid number')
            .required('This field is required'),
        rent30daysormore: Yup.number()
            .typeError('Please enter a valid number')
            .required('This field is required'),
        rent10to20days: Yup.number()
            .typeError('Please enter a valid number')
            .required('This field is required'),
        rentupto10days: Yup.number()
            .typeError('Please enter a valid number')
            .required('This field is required'),
        vehiclenumber: Yup.string()
            .strict(true)
            .trim('Name must not contain white space')
            .test('no-whitespace', 'Name must not contain white space', (value) => !/\s/.test(value)),
        category: Yup.string().required(),
        image: Yup.string().required("This field is required")
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return (
        <div>
            <AdminSidebar />
            <div className='p-4 sm:ml-64 flex flex-col'>
                <div className=' font-bold'>ADD CAR</div>
                <div className='border border-[#c0bebc] rounded-md shadow-md mt-3 p-4'>
                    <form action="" onSubmit={formik.handleSubmit} method="post" >
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="">Model Name</label>
                                <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.modelname} name="modelname" id="floating_first_name" className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border" placeholder=" " required />
                                {formik.touched.modelname && formik.errors.modelname ? <p className="text-sm text-red-600">{formik.errors.modelname}</p> : null}

                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="">Brand</label>
                                <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.brand} name="brand" id="floating_first_name" className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border" placeholder=" " required />
                                {formik.touched.brand && formik.errors.brand ? <p className="text-sm text-red-600">{formik.errors.brand}</p> : null}

                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="">Fuel Type</label>
                                <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fueltype} name="fueltype" id="floating_first_name" className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border" placeholder=" " required />
                                {formik.touched.fueltype && formik.errors.fueltype ? <p className="text-sm text-red-600">{formik.errors.fueltype}</p> : null}

                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="">Transmission Type</label>
                                {/* <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border" placeholder=" " required /> */}
                                <select name="transmissionType" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.transmissionType} id="transmissionType" className="block py-2 px-1 w-full text-sm text-gray-900 bg-transparent border" required>
                                    <option value="">Select a transmission type</option>
                                    <option value="automatic">Automatic</option>
                                    <option value="manual">Manual</option>
                                </select>
                                {formik.touched.transmissionType && formik.errors.transmissionType ? <p className="text-sm text-red-600">{formik.errors.transmissionType}</p> : null}

                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="">Total Kms Driven</label>
                                <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.TotalKm} name="TotalKm" id="floating_first_name" className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border" placeholder=" " required />
                                {formik.touched.TotalKm && formik.errors.TotalKm ? <p className="text-sm text-red-600">{formik.errors.TotalKm}</p> : null}

                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="">Per Day Rent For 30 Days Or More</label>
                                <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rent30daysormore} name="rent30daysormore" id="floating_first_name" className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border" placeholder=" " required />
                                {formik.touched.rent30daysormore && formik.errors.rent30daysormore ? <p className="text-sm text-red-600">{formik.errors.rent30daysormore}</p> : null}

                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="">Per Day Rent For 10 to 20 Days</label>
                                <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rent10to20days} name="rent10to20days" id="floating_first_name" className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border" placeholder=" " required />
                                {formik.touched.rent10to20days && formik.errors.rent10to20days ? <p className="text-sm text-red-600">{formik.errors.rent10to20days}</p> : null}

                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="">Per Day Rent Upto 10 Days</label>
                                <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rentupto10days} name="rentupto10days" id="floating_first_name" className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border" placeholder=" " required />
                                {formik.touched.rentupto10days && formik.errors.rentupto10days ? <p className="text-sm text-red-600">{formik.errors.rentupto10days}</p> : null}

                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="">Vehicle Number</label>
                            <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.vehiclenumber} name='vehiclenumber' className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border" required />
                            {formik.touched.vehiclenumber && formik.errors.vehiclenumber ? <p className="text-sm text-red-600">{formik.errors.vehiclenumber}</p> : null}

                        </div>
                        <div className="mb-6">
                            <label htmlFor="">Category</label>
                            {categories &&
                                <select onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.category} name='category' id="category" className="block py-2 px-1 w-full text-sm text-gray-900 bg-transparent border" required>
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (

                                        <option value="option1">{category.categoryName}</option>
                                    ))}

                                </select>
                            }
                            {formik.touched.category && formik.errors.category ? <p className="text-sm text-red-600">{formik.errors.category}</p> : null}

                        </div>
                        <div className="mb-6">
                            <label htmlFor="">Image</label>
                            <input type="file" onChange={(e) => {
                                const file = e.currentTarget.files[0];
                                formik.setFieldValue('image', file);
                            }}
                                onBlur={formik.handleBlur} name='image' className="block  px-0 w-full text-sm text-gray-900 bg-transparent border border-black" required />
                            {formik.touched.image && formik.errors.image ? <p className="text-sm text-red-600">{formik.errors.image}</p> : null}

                        </div>
                        <div className='flex justify-end'>
                            <button type='submit' className='bg-[#368E88] text-white p-2 rounded-md'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminAddCar

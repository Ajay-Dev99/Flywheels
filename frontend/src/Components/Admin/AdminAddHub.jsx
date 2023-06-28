import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { adminAddHubapi } from '../../Services/AdminApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function AdminAddHub() {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)


  const initialValues = {
    hubname: "",
    buildingname: "",
    district: "",
    street: "",
    pincode: "",

  }
  const onSubmit = async (values) => {
    setIsLoading(true)
    try {
      adminAddHubapi(values).then((response) => {
        if (response.data.status) {
          toast.success(response.data.message)
          navigate("/admin/hubs")
        } else {
          setIsLoading(false)
          toast.error(response.data.message, {
            position: "top-center"
          })
        }
      })
    } catch (error) {
      setIsLoading(false)
    }
  };

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
          <form >
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
            <div className='mb-6'>
              <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload an image</label>
              {formik.touched.image && formik.errors.image ? <p className='text-sm text-red-600'>{formik.errors.image}</p> : null}
              <input type="file" name="image" onChange={(e) => {
                const file = e.currentTarget.files[0];
                formik.setFieldValue('image', file)
              }} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
            </div>

            <div className='flex justify-end'>
              <button type='button' onClick={!isLoading ? formik.handleSubmit : undefined} className='bg-[#368E88] text-white p-2 rounded-md'>   {isLoading ? (
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
                'Submit'
              )}</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default AdminAddHub

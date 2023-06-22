import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { adminAddCategory, adminGetCategoryList } from '../../Services/AdminApi'
import { toast } from 'react-toastify'


function AdminCategories() {

  const [categories, setCategories] = useState("")

  const initialValues = {
    categoryName: "",
    image: ""
  }

  useEffect(() => {
    adminGetCategoryList().then((response) => {
      if (response.data.status) {
        setCategories(response.data.categories)
      } else {
        toast.error(response.data.message, {
          position: 'top-center'
        })
      }
    })
  }, [])

  const onSubmit = async (values) => {
    adminAddCategory(values)
      .then((response) => {
        if (response.data.status) {
          const newCategories = [...categories, response.data.category]
          setCategories(newCategories)
          toast(response.data.message)
        } else {
          toast.error(response.data.message, {
            position: 'top-center'
          })
        }
      })
  }

  const validationSchema = Yup.object({
    categoryName: Yup.string().min(3, 'Name must be at least 3 characters long').required("* This field is required"),
    image: Yup.string().required("* This field is required")
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
        <div className='flex justify-between  md:py-4  md:px-24 mt-7'>
          <div className='mt-1.5'><h1 className='font-semibold text-lg'> Categories</h1></div>
          <div><button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-white bg-[#368E88] hover:bg-[#32a39c] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">
            ADD CATEGORY
          </button></div>

          {<div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-[#32a39c] hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="px-6 py-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-gray-900">ADD NEW CATEGORY</h3>
                  <form className="space-y-6" onSubmit={formik.handleSubmit} >
                    <div>
                      <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
                      {formik.touched.categoryName && formik.errors.categoryName ? <p className='text-sm text-red-600'>{formik.errors.categoryName}</p> : null}
                      <input type="text" name="categoryName" id="" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.categoryName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                    <div>
                      <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload an image</label>
                      {formik.touched.image && formik.errors.image ? <p className='text-sm text-red-600'>{formik.errors.image}</p> : null}
                      <input type="file" name="image" onChange={(e) => {
                        const file = e.currentTarget.files[0];
                        formik.setFieldValue('image', file)
                      }} onBlur={formik.handleBlur} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                    </div>

                    <button type="submit" className="w-full text-white bg-[#368E88] hover:bg-[#32a39c] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">ADD</button>

                  </form>
                </div>
              </div>
            </div>
          </div>
          }
        </div>


        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category ID
                </th>
                <th scope="col" className="px-6 py-3">
                  CategoryName
                </th>
                <th scope="col" className="px-6 py-3">
                  Category Image
                </th>
                <th scope="col" className="px-6 py-3">

                </th>
              </tr>
            </thead>
            {categories && <tbody>
              {categories.map((category) => (


                <tr key={category._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {category._id}
                  </th>
                  <td className="px-6 py-4">
                    {category.categoryName}
                  </td>
                  <td className="px-6 py-4">
                    <img src={`${process.env.REACT_APP_BASE_URL}/${category.imageUrl}`} alt="" className='h-[5.5rem] w-[6.5rem]' />
                  </td>
                  <td className="px-6 py-4">
                    <button>
                      delete
                    </button>
                  </td>
                </tr>
              ))
              }
            </tbody>}
          </table>
        </div>


      </div>
    </div>
  )
}

export default AdminCategories

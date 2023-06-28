import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { adminAddCategory, adminGetCategoryList } from '../../Services/AdminApi'
import { toast } from 'react-toastify'


function AdminCategories() {

  const [categories, setCategories] = useState("")
  const [isLoading, setIsLoading] = useState(false)



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
    setIsLoading(true)
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
          setIsLoading(false)
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
                  <form className="space-y-6"  >
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

                    {/* <button type="submit" className="w-full text-white bg-[#368E88] hover:bg-[#32a39c] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">ADD</button> */}
                    <button type='button' onClick={!isLoading ? formik.handleSubmit : undefined} className={`bg-[#358E88] ${isLoading ? 'cursor-not-allowed opacity-50' : ''
                      } p-2 md:px-5 mt-4 md:mt-7 mb-2 md:mb-0 text-white w-full`}>
                      {isLoading ? (
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
                      )}
                    </button>

                  </form>
                </div>
              </div>
            </div>
          </div>
          }
        </div>


        {categories ? <div className="relative overflow-x-auto">
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
        </div> : <div role="status " className='flex justify-center h-screen items-center'>
          <svg aria-hidden="true" className="w-10 h-10 mr-2  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>}


      </div>
    </div>
  )
}

export default AdminCategories

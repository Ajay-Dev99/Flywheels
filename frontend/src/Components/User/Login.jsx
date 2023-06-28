
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { login } from '../../Services/UserApi'
import { toast } from 'react-toastify'
import { setUserDetails } from '../../features/setUser'
import { useDispatch } from 'react-redux'
import Header from './userHeader'



function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showpassword, setshowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const generateError = (err) => {
    toast.error(err, {
      position: "top-center"
    })
  }
  const initialValues = {
    email: "",
    password: ""
  }
  const onSubmit = async (values) => {
    try {
      setIsLoading(true)
      const { data } = await login(values)
      if (data) {
        if (data.errors) {
          setIsLoading(false)
          const { email, password, block } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
          else if (block) generateError(block)
        } else {
          localStorage.setItem("jwt", data.token)
          dispatch(setUserDetails(data.user))
          navigate('/')
        }
      }

    } catch (error) {

    }
  }
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required("* This field is required"),
    password: Yup.string().required("This field is required ")
  })

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })


  return (
    <div >
      <div>
        <Header />
      </div>
      <div className='flex flex-col justify-center items-center bg-[#358E88] h-screen '>
        <div className='border flex flex-col bg-white justify-center items-center p-5 rounded-lg'>
          <img src="/images/login.png" className=' w-60 xl:w-96  md:w-80 h-auto' alt="" />
          <form action="" className='w-full'>
            {formik.touched.email && formik.errors.email ? <p className="text-sm text-red-600">{formik.errors.email}</p> : null}
            <input type="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 my-2" placeholder='Email Address'></input>
            {formik.touched.password && formik.errors.password ? <p className="text-sm text-red-600">{formik.errors.email}</p> : null}
            <div className='flex w-full relative'>
              <input type={showpassword ? "text" : "password"} name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 my-2 " placeholder='Password'></input>
              <button className='absolute right-3 top-5' type="button" onClick={() => setshowPassword(!showpassword)}>
                {showpassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {/* <button type='submit' className='bg-[#358E88] p-2 text-white md:text-lg text-sm w-full mt-5'>Login</button> */}
            <button type='button' onClick={!isLoading ? formik.handleSubmit : undefined} className={`bg-[#358E88] ${isLoading ? 'cursor-not-allowed opacity-50' : ''
              } p-2 text-white md:text-lg text-sm w-full mt-5`}>{isLoading ? (
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
                'Login'
              )}</button>
          </form>
          <Link to={"/signup"}> <p className='my-3 md:text-sm text-xs hover:cursor-pointer hover:text-sky-400/75'>New Member? Signup</p></Link>
        </div>
      </div>
    </div>
  )
}

export default Login

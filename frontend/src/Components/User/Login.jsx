
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { login } from '../../Services/UserApi'
import { toast } from 'react-toastify'
import { setUserDetails } from '../../features/setUser'
import { useDispatch } from 'react-redux'



function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showpassword, setshowPassword] = useState(false)
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
      const { data } = await login(values)
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
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
      <div className='flex flex-col justify-center items-center bg-[#358E88] h-screen '>
        <div className='border flex flex-col bg-white justify-center items-center p-5 rounded-lg'>
          <img src="/images/login.png" className=' w-60 xl:w-96  md:w-80 h-auto' alt="" />
          <form action="" className='w-full' onSubmit={formik.handleSubmit}>
            {formik.touched.email && formik.errors.email ? <p className="text-sm text-red-600">{formik.errors.email}</p> : null}
            <input type="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 my-2" placeholder='Email Address'></input>
            {formik.touched.password && formik.errors.password ? <p className="text-sm text-red-600">{formik.errors.email}</p> : null}
            <div className='flex w-full relative'>
              <input type={showpassword ? "text" : "password"} name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 my-2 " placeholder='Password'></input>
              <button className='absolute right-3 top-5' type="button" onClick={() => setshowPassword(!showpassword)}>
                {showpassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button type='submit' className='bg-[#358E88] p-2 text-white md:text-lg text-sm w-full mt-5'>Login</button>
          </form>
          <Link to={"/signup"}> <p className='my-3 md:text-sm text-xs hover:cursor-pointer hover:text-sky-400/75'>New Member? Signup</p></Link>
        </div>
      </div>
    </div>
  )
}

export default Login

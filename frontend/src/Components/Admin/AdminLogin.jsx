import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { adminLogin } from "../../Services/AdminApi"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


function AdminLogin() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [password, setpassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)



    const initialValues = {
        email: "",
        password: ""
    }

    const onSubmit = async (values) => {
        try {
            setIsLoading(true)
            const { data } = await adminLogin(values)
            if (data) {
                if (data.status) {
                    localStorage.setItem("adminJwt", data.token)
                    navigate("/admin/")
                    // toast(data.message)
                } else {
                    toast.error(data.message, {
                        position: "top-center"
                    })
                    setIsLoading(false)
                }
            }
        } catch (error) {
            toast(error.message)
        }
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("* This field is required"),
        password: Yup.string().required("* This field is required")
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return (
        <div>
            <div className='flex flex-col justify-center items-center bg-[#358E88] h-screen p-4 md:px-0'>
                <div className='border flex flex-col bg-white justify-center items-center p-5 md:p-9 rounded-lg'>
                    <img src="/images/Admin.jpg" className=' w-60 xl:w-96   md:w-80 h-auto ' alt="" />
                    <h1 className="text-sm md:text-xl font-bold my-2 md:my-4">ADMIN LOGIN</h1>
                    <form action="" className="w-full" >
                        {formik.touched.email && formik.errors.email ? <p className="text-sm text-red-600">{formik.errors.email}</p> : null}
                        <input type="email" onChange={formik.handleChange} value={formik.values.email} name="email" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 my-2" placeholder='Email Address'></input>
                        {formik.touched.password && formik.errors.password ? <p className="text-sm text-red-600">{formik.errors.email}</p> : null}
                        <div className='flex w-full relative'>
                            <input type={showPassword ? "text" : "password"} name="password" onChange={(e) => {
                                setpassword(e.target.value)
                                formik.handleChange(e)
                            }} value={formik.values.password} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 my-2 " placeholder='Password'></input>
                            {password && <button className="absolute right-4 top-5" onClick={() => { setShowPassword(!showPassword) }}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>}
                        </div>
                        {/* <button type='submit' className='bg-[#358E88] p-2 text-white md:text-lg text-sm w-full my-5'>Login</button> */}
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
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
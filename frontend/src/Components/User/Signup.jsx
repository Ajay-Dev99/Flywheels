import axios from "axios"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {userSignup} from '../../Services/UserApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const navigate = useNavigate()
    const [showpassword, setShowPassword] = useState(false)
    const [confirmpassword, setConfirmPassword] = useState(false)
    const [Passwordvalue, setPasswordvalue] = useState("")
    const [confirmPasswordvalue, setconfirmPasswordvalue] = useState("")

    const initialValues = {
        name: "",
        phone_number: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
    const onSubmit = async(values) => {
        try {
            const {data} = await userSignup(values)
            if(data.status){
                navigate('/otp')
            }else{
                toast(data.message)
            }
        } catch (error) {
            toast(error.message)
        }
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .strict(true)
            .trim('Name must not contain white space')
            .test('no-whitespace', 'Name must not contain white space', (value) => !/\s/.test(value))
            .min(3, 'Name must be at least 3 characters long')
            .matches(/^[A-Za-z]+$/, 'Name must only contain characters')
            .required('* This field is required'),
        phone_number: Yup.string().matches(/^\d{10}$/, 'Invalid phone number').required("* This field is required"),
        email: Yup.string().email('Invalid email address').required("* This field is required").matches(
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            'Invalid email address'
        ),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters long')
            .matches(
                /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
                'Password must contain at least one capital letter\nand one special character'
            ).required("* This field is required"),
        confirmPassword: Yup
            .string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required("* This field is required")
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return (
        <div>
            <div className="flex flex-col h-screen bg-[#358E88] justify-center items-center ">
                <div className="bg-white flex flex-col p-12 rounded-lg justify-center items-center">
                    <img src="/images/signup.png" className=" w-60 md:w-80 h-auto" alt="" />
                    <form action="" className="w-full" onSubmit={formik.handleSubmit} >
                        {formik.touched.name && formik.errors.name ? <p className="text-sm text-red-600">{formik.errors.name}</p> : null}
                        <input type="text" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 my-2" placeholder='First Name'></input>
                        {formik.touched.phone_number && formik.errors.phone_number ? <p className="text-sm text-red-600">{formik.errors.phone_number}</p> : null}
                        <input type="tel" name="phone_number" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone_number} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 my-2" placeholder='Phone Number'></input>

                        {formik.touched.email && formik.errors.email ? <p className="text-sm text-red-600">{formik.errors.email}</p> : null}
                        <input type="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 my-2" placeholder='Email Address'></input>
                        {formik.touched.password && formik.errors.password ? <p className="text-sm text-red-600">{formik.errors.password}</p> : null}
                        <div className="w-full flex relative">
                            <input type={showpassword ? "text" : "password"} onChange={(e) => {
                                setPasswordvalue(e.target.value)
                                formik.handleChange(e)
                            }} onBlur={formik.handleBlur}
                                value={formik.values.password} name="password" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 my-2" placeholder='Password'></input>
                            {Passwordvalue && <button className="absolute right-3 top-5" onClick={() => setShowPassword(!showpassword)}>{showpassword ? <FaEyeSlash /> : <FaEye />}</button>}
                        </div>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className="text-sm text-red-600">{formik.errors.confirmPassword}</p> : null}
                        <div className="w-full flex relative">
                            <input type={confirmpassword ? "text" : "password"} onChange={(e) => {
                                setconfirmPasswordvalue(e.target.value)
                                formik.handleChange(e)
                            }} onBlur={formik.handleBlur} value={formik.values.confirmPassword} name="confirmPassword" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 my-2" placeholder='Confirm Password'></input>
                            {confirmPasswordvalue && <button className="absolute right-3 top-5" onClick={() => { setConfirmPassword(!confirmpassword) }}>{confirmpassword ? <FaEyeSlash /> : <FaEye />}</button>}
                        </div>
                        <button type='submit' className='bg-[#358E88] p-2 text-white md:text-lg text-sm w-full mt-5'>Signup</button>
                    </form>

                    <Link to={"/login"}><p className='my-3 md:text-sm text-xs hover:cursor-pointer hover:text-sky-400/75'>Already Member? Login</p></Link>

                </div>
            </div>
        </div>
    )
}

export default Signup
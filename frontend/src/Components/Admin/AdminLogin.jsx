import { useState } from "react"
import {FaEye,FaEyeSlash} from "react-icons/fa"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { adminLogin } from "../../Services/AdminApi"
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'


function AdminLogin() {
    const navigate = useNavigate()
    const [showPassword,setShowPassword] = useState(false)
    const[password,setpassword] = useState("")
    

    const initialValues={
        email:"",
        password:""
    }

    const onSubmit=async(values)=>{
        try {
            console.log(values);
        const {data} = await adminLogin(values)
        if(data){
            if(data.status){
                localStorage.setItem("adminJwt",data.token)
                navigate("/admin/")
                // toast(data.message)
            }else{
                toast.error (data.message,{
                    position:"top-center"
                })
            }
        }
        } catch (error) {
            toast(error.message)
        }
    }

    const validationSchema = Yup.object({
        email:Yup.string().email("Invalid email address").required("* This field is required"),
        password:Yup.string().required("* This field is required")
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
                    <form action="" className="w-full" onSubmit={formik.handleSubmit}>
                    {formik.touched.email && formik.errors.email ? <p className="text-sm text-red-600">{formik.errors.email}</p> : null}
                    <input type="email" onChange={formik.handleChange}  value={formik.values.email} name="email" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 my-2" placeholder='Email Address'></input>
                    {formik.touched.password && formik.errors.password ? <p className="text-sm text-red-600">{formik.errors.email}</p> : null}
                    <div className='flex w-full relative'>
                        <input type={showPassword?"text":"password"} name="password"  onChange={(e)=>{
                            setpassword(e.target.value)
                            formik.handleChange(e)
                            }} value={formik.values.password} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 my-2 " placeholder='Password'></input>
                   {password && <button className="absolute right-4 top-5" onClick={()=>{setShowPassword(!showPassword)}}>{showPassword ? <FaEyeSlash/>:<FaEye/>}</button>}
                    </div>
                    <button type='submit' className='bg-[#358E88] p-2 text-white md:text-lg text-sm w-full my-5'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
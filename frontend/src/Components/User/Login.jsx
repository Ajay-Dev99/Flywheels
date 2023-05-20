
import React, { useState } from 'react'
import {FaEye,FaEyeSlash} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Login() {
    const [showpassword,setshowPassword] = useState(false)
  return (
       <div >
        <div className='flex flex-col justify-center items-center bg-[#358E88] h-screen '>
        <div className='border flex flex-col bg-white justify-center items-center p-5 rounded-lg'>
        <img src="/images/login.png" className=' w-60 xl:w-96  md:w-80 h-auto' alt=""/>
        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 my-2" placeholder='Email Address'></input>
       <div className='flex w-full relative'>
        <input type={showpassword ? "text" : "password"} id="password" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 my-2 " placeholder='Password'></input>
        <button className='absolute right-3 top-5' type="button" onClick={()=>setshowPassword(!showpassword)}>
      {showpassword ? <FaEyeSlash /> : <FaEye />}
    </button>
        </div> 
        <button type='button' className='bg-[#358E88] p-2 text-white md:text-lg text-sm w-full mt-5'>Login</button>
       <Link to={"/signup"}> <p className='my-3 md:text-sm text-xs hover:cursor-pointer hover:text-sky-400/75'>New Member? Signup</p></Link>
        </div>
        </div>
    </div>
  )
}

export default Login

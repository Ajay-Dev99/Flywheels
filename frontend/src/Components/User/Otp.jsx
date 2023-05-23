import React, { useEffect, useRef, useState } from 'react'
import { Formik, useFormik } from 'formik'
import { getOtp, verifyOtp } from '../../Services/UserApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const validate = (values)=>{
  const errors = {}
  if(Object.values(values.otp).some((data)=>data === "")){
    errors.otp = "This field is required"
  }
  return errors;
}


function Otp() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      otp: Array.from({ length: 6 }).fill("")
    },
    validate,
    onSubmit: async(values) => {
      const otp = parseInt(values.otp.join(""));
      const {data}= await verifyOtp(otp)
      console.log(data);
     if(!data.status){
      toast(data.message)
     }
    else{
      localStorage.setItem("jwt",data.token)
      toast(data.message)
      navigate('/')
     }
     
    }
  });

  const inputRef = useRef({})


  useEffect(() => {

    inputRef.current[0].focus();

  }, [])

  const handleChange = (event, index) => {
    const { value } = event.target;
    if (/[a-z]/gi.test(value)) return;

    const currentOTP = [...formik.values.otp]

    currentOTP[index] = value.slice(-1)

    formik.setValues((prev) => ({
      ...prev,
      otp: currentOTP
    }))



    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (event, index) => {
    if (event.key === "Backspace") {
      if (index > 0) {
        inputRef.current[index - 1].focus();
      }
    }
  }

  const renderInput = () => {
    return formik.values.otp.map((value, index) => (
      <input
        key={index}
        ref={(element) => (inputRef.current[index] = element)}
        type="text" name={index} className='border border-black w-8 h-8 md:w-12 md:h-12 m-[0.3rem] md:m-3 rounded-md text-center text-sm md:text-xl ' onChange={(event) => handleChange(event, index)}
        onKeyUp={(event) => handleBackspace(event, index)}
        value={value}
      />
    ))

  }

  return (
    <div className='flex flex-col justify-center items-center bg-[#358E88] h-screen '>
      <div className='flex justify-center items-center bg-white p-0 md:p-8 rounded-lg'>
        <form action="" >
          <div className='flex flex-col justify-center items-center  md:p-10 p-[0.5rem]'>
            <h1 className='my-4 text-sm md:text-xl '>Enter Your OTP</h1>
            <Formik >
              <div>{renderInput()}</div>
            </Formik>
            {formik.errors.otp && <p className='text-xs text-red-700'>Please fill the fields</p>}
            <button type='button' onClick={formik.handleSubmit} className='bg-[#358E88] p-2 md:px-5 mt-4 md:mt-7 mb-2 md:mb-0 text-white w-full'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Otp

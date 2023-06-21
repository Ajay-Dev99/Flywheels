import React, { useEffect, useRef, useState } from 'react'
import { Formik, useFormik } from 'formik'
import { verifyOtp } from '../../Services/UserApi'
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
  const [isLoading,setIsLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      otp: Array.from({ length: 6 }).fill("")
    },
    validate,
    onSubmit: async(values) => {
      setIsLoading(true)
      const otp = parseInt(values.otp.join(""));
      const {data}= await verifyOtp(otp)
     if(!data.status){
      toast(data.message)
      setIsLoading(false)

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
            <button type='button'  onClick={!isLoading ? formik.handleSubmit : undefined} className={`bg-[#358E88] ${
        isLoading ? 'cursor-not-allowed opacity-50' : ''
      } p-2 md:px-5 mt-4 md:mt-7 mb-2 md:mb-0 text-white w-full`}>
              {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
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
      ) : (
        'Submit'
      )}
        </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Otp

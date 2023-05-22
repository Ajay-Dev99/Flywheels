import axiosInstance from "../axios/axiosInstance";

export const userSignup = (values)=>{
    return axiosInstance().post("/register",{...values})
}

export const verifyOtp = (otp)=>{
    console.log(otp,"otp to pass");
    return axiosInstance().post("/verifyotp",{"otp":otp})
}
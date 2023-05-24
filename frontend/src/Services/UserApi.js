import {userInstance} from "../axios/axiosInstance";

export const userSignup = (values)=>{
    return userInstance.post("/register",{...values})
}

export const verifyOtp = (otp)=>{
    return userInstance.post("/verifyotp",{"otp":otp})
}

export const login =(values)=>{
    return userInstance.post("/login",{...values})
}

export const Home = ()=>{
    return userInstance.get("/")
}
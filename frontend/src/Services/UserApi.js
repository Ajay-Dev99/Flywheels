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

export const userHeader = ()=>{
    return userInstance.get("/")
}

export const listVehicle = (key,page,limit)=>{
    return userInstance.get("/listvehicles",{params:{
        key,
        limit,
        page
    }})
}

export const viewVehicle = (id)=>{
    console.log(id,"vehicle id");
    return userInstance.get(`/viewvehicle/${id}`)
}


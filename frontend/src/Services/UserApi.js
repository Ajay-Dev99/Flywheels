
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
    return userInstance.get(`/viewvehicle/${id}`)
}

export const bookaCarAPi = (values,id)=>{
    console.log(values,id);
    return userInstance.post(`/bookacar/${id}`,{...values},{headers:{"Content-Type":"multipart/form-data"}})
}

export const Transmissionfilterapi = (key,page,limit)=>{
    return userInstance.get("/filtercar",{params:{
        key,
        limit,
        page
    }})
}

export const HublistingAPI = ()=>{
    return userInstance.get("/gethubs")
}


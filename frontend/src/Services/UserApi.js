
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
    return userInstance.post(`/bookacar/${id}`,{...values},{headers:{"Content-Type":"multipart/form-data"},withCredentials: true})
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

export const PaymentDetailsApi = ()=>{
    return userInstance.get("/paymentDetails",{withCredentials:true})
}

export const logoutAPI = ()=>{
    return userInstance.get("/logout")
}

export const orderApi = (amount)=>{
    console.log(amount,"calledd");
    return userInstance.post("/orders",{...amount})
}

export const verifyPayment = (response,data,vehicleid,totalAmountamount)=>{
    const amount = totalAmountamount/100;

    const payload = {
        ...response,
        ...data,
        vehicleid,
        amount
      };
    return userInstance.post("/verifypayment",payload)
}
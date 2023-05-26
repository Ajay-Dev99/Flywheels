import {adminInstance} from "../axios/axiosInstance";


export const adminLogin = (values)=>{
    // return axiosInstance().post("/admin/login",{...values})
    return adminInstance.post("/login",{...values})
    
}

export const adminAuthetication = (values)=>{
return adminInstance.post("/",{...values})
}

export const adminAddCar = (values)=>{
    console.log(values,"inapi");
    return adminInstance.post("/addcar",{...values},{ headers: { "Content-Type": "multipart/form-data" }})
}
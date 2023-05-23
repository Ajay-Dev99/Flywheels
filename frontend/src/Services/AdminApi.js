import {adminInstance} from "../axios/axiosInstance";


export const adminLogin = (values)=>{
    console.log("admin called");
    // return axiosInstance().post("/admin/login",{...values})
    return adminInstance.post("/login",{...values})
    
}
import axiosInstance from "../axios/axiosInstance";

export const userSignup = (values)=>{
    return axiosInstance().post("/register",{...values})
}
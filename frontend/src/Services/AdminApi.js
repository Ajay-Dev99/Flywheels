import {adminInstance} from "../axios/axiosInstance";


export const adminLogin = (values)=>{
    // return axiosInstance().post("/admin/login",{...values})
    return adminInstance.post("/login",{...values})
    
}

export const adminAuthetication = (values)=>{
return adminInstance.post("/",{...values})
}

export const adminAddCar = (values)=>{
    return adminInstance.post("/addcar",{...values},{ headers: { "Content-Type": "multipart/form-data" }})
}

export const adminsideUserList = ()=>{
    return adminInstance.get("/listUsers")
}

export const adminAddCategory = (values)=>{
    console.log(values,"in api");
    return adminInstance.post("/addCategory",{...values},{headers:{"Content-Type":"multipart/form-data"}})
}
export const adminGetCategoryList = ()=>{
    return adminInstance.get("/getCategories")
}
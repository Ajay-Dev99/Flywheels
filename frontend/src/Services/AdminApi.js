import {adminInstance} from "../axios/axiosInstance";


export const adminLogin = (values)=>{
    // return axiosInstance().post("/admin/login",{...values})
    return adminInstance.post("/login",{...values})
    
}

export const adminAuthetication = (values)=>{
return adminInstance.post("/",{...values})
}

export const adminAddCar = (values)=>{
    return adminInstance.post("/addcar",values,{ headers: { "Content-Type": "multipart/form-data" }})
}

export const adminEditCar = (values,id)=>{
    console.log(values,"edit car");
    return adminInstance.post(`/editcar/${id}`,values,{headers: { "Content-Type": "multipart/form-data"}})
}

export const adminsideUserList = ()=>{
    return adminInstance.get("/listUsers")
}

export const adminAddCategory = (values)=>{
    return adminInstance.post("/addCategory",{...values},{headers:{"Content-Type":"multipart/form-data"}})
}
export const adminGetCategoryList = ()=>{
    return adminInstance.get("/getCategories")
}

export const adminviewVehicleDetails = (vehicleId)=>{
        return adminInstance.get(`/viewvehicledetails/${vehicleId}`)
}

export const adminDeleteVehicle = (vehicleId)=>{
    return adminInstance.post(`/deletecar/${vehicleId}`)
}

export const adminAddHubapi = (values,image)=>{
    console.log(values,"form data from values");
    return adminInstance.post('/addhub',{...values},{headers:{"Content-Type":"multipart/form-data"}})
}
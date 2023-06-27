import { adminInstance } from "../axios/axiosInstance";


export const adminLogin = (values) => {
    // return axiosInstance().post("/admin/login",{...values})
    return adminInstance.post("/login", { ...values })

}

export const adminAuthetication = (values) => {
    return adminInstance.post("/", { ...values })
}

export const adminAddCar = (values) => {
    return adminInstance.post("/addcar", values, { headers: { "Content-Type": "multipart/form-data" } })
}

export const adminEditCar = (values, id) => {
    return adminInstance.post(`/editcar/${id}`, values, { headers: { "Content-Type": "multipart/form-data" } })
}

export const adminsideUserList = () => {
    return adminInstance.get("/listUsers")
}

export const adminAddCategory = (values) => {
    return adminInstance.post("/addCategory", { ...values }, { headers: { "Content-Type": "multipart/form-data" } })
}
export const adminGetCategoryList = () => {
    return adminInstance.get("/getCategories")
}

export const adminviewVehicleDetails = (vehicleId) => {
    return adminInstance.get(`/viewvehicledetails/${vehicleId}`)
}

export const adminDeleteVehicle = (vehicleId) => {
    return adminInstance.post(`/deletecar/${vehicleId}`)
}

export const adminAddHubapi = (values) => {
    return adminInstance.post('/addhub', { ...values }, { headers: { "Content-Type": "multipart/form-data" } })
}

export const apiUserBlock = (userId) => {
    return adminInstance.post(`/user/block/${userId}`)
}

export const adminHubListingApi = () => {
    return adminInstance.get("/gethubs")
}

export const getHubDetails = (id) => {
    return adminInstance.get(`viewhub/${id}`)
}

export const editHub = (values, id) => {
    return adminInstance.post(`EditHub/${id}`, { ...values }, { headers: { "Content-Type": "multipart/form-data" } })
}

export const getbookingAPI = () => {
    return adminInstance.get("/getbookings");
}

export const getOrderDetailsAPI = (orderId) => {
    return adminInstance.get(`/getorderdetails/${orderId}`)
}

export const OrderStatusChangeAPI = (value, id, btn) => {
    return adminInstance.post(`/changeOrderStatus/${id}`, { idx: value, from: btn })
}

export const AdminDashboard = () => {
    return adminInstance.get("/admindashboard")
}


export const OrderFilterAPI = (key) => {
    return adminInstance.post("/filterorders", { key: key })
}
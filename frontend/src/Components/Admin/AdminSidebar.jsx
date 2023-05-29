import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCarSide, FaListAlt, FaCommentAlt ,FaBookmark} from 'react-icons/fa'
import { adminAuthetication } from "../../Services/AdminApi"


import { toast } from 'react-toastify'

function AdminSidebar() {
    const navigate = useNavigate()
    useEffect(() => {
        try {
            adminAuthetication().then((response) => {
                
                if (response.data.loginfail) {
                    adminLogout()
                }
            })
        } catch (error) {
            toast.error(error.message, {
                position: 'top-center'
            })
        }

    }, [])

    const adminLogout = () => {
        localStorage.removeItem("adminJwt")
        navigate("/admin/login")
    }

    return (
        <div>

            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border flex flex-col border-[#e5e7eb]" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
                    <div className='border border-white rounded-md text-center p-3 mx-1 md:mx-4 my-5 bg-[#368E88] text-white text-sm md:text-xl'>ADMIN</div>
                    <div className='text-center font-semibold my-7 bg-[#F3F4F6] p-2' > Pages</div>
                    <ul className="space-y-2 font-medium flex-grow">
                        <li>
                            <div onClick={() =>navigate("/admin/")} className="flex items-center p-2 text-gray-900  border hover:bg-gray-100 ">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                <span className="ml-3">Dashboard</span>
                            </div>
                        </li>

                        <li>
                            <div onClick={() => navigate("/admin/users")} className="flex items-center p-2 text-gray-900   hover:bg-gray-100 border">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => navigate("/admin/viewcars")} className="flex items-center p-2 text-gray-900   hover:bg-gray-100 border">
                                <FaCarSide className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 " />
                                <span className="flex-1 ml-3 whitespace-nowrap">Cars</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => navigate("/admin/bookings")} className="flex items-center p-2 text-gray-900   hover:bg-gray-100 border">
                                <FaListAlt className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 " />
                                <span className="flex-1 ml-3 whitespace-nowrap">Bookings</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => navigate("/admin/categories")} className="flex items-center p-2 text-gray-900   hover:bg-gray-100 border">
                                <FaBookmark className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 " />
                                <span className="flex-1 ml-3 whitespace-nowrap">Categories</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => navigate("/admin/feedback")} className="flex items-center p-2 text-gray-900   hover:bg-gray-100 border">
                                <FaCommentAlt className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 " />
                                <span className="flex-1 ml-3 whitespace-nowrap">Feedback</span>
                            </div>
                        </li>

                    </ul>
                </div>
                <div className='flex justify-center bg-gray-50'>
                    <button type='button' onClick={adminLogout} className=' px-4 py-2    w-full bg-black text-white'>Logout</button>
                </div>
            </aside>
        </div>
    )
}

export default AdminSidebar

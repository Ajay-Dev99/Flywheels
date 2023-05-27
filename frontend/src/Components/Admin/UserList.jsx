import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { adminsideUserList } from '../../Services/AdminApi'
import { toast } from 'react-toastify'

function UserList() {
const [users,setUsers] = useState()

  useEffect(()=>{
    adminsideUserList().then((response)=>{
      if(response.data.status){
        setUsers(response.data.users)
      }else{
        toast.error(response.data.message,{
          position:"top-center"
        })
      }
    })
  },[])



  return (
    <div>
      <AdminSidebar />
      <div className='p-4 sm:ml-64'>
        <div className="relative overflow-x-auto  md:py-4  mt-7">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User name
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Email Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Verified Status
                </th>
                <th scope="col" className="px-6 py-3">

                </th>
              </tr>
            </thead>
           { users && <tbody>
              {
                users.map((user)=>(

                
              <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.name}
                </th>
                <td className="px-6 py-4">
                {user.phone_number}
                </td>
                <td className="px-6 py-4">
                {user.email}
                </td>
                <td className="px-6 py-4">
                  
                {user.verified ?<span className='text-green-700 font-bold'>True</span> : <span>False</span>}
                </td>
                <td className="px-6 py-4">
                  <button className='bg-red-600 px-3 py-1 text-white rounded-md shadow-md shadow-gray-600'>Block</button>
                </td>
              </tr>
              ))
              }
            </tbody> }
          </table>
        </div>


      </div>
    </div>
  )
}

export default UserList

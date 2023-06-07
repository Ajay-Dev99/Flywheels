import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { useNavigate } from 'react-router-dom'
import { adminHubListingApi } from '../../Services/AdminApi'
import {BiBlock} from "react-icons/bi"

function Hubs() {
  const navigate = useNavigate()
  const [hubs, setHubs] = useState([])

  useEffect(() => {
    try {
      adminHubListingApi().then((response) => {
        if (response.data.status) {
          setHubs(response.data.hubs)
        }
      })
    } catch (error) {

    }
  }, [])


  return (
    <div>
      <AdminSidebar />
      <div className='p-2 md:p-4 sm:ml-64'>
        <div className='flex justify-between  md:py-4  md:px-24 mt-7'>
          <div className='mt-1.5'>
            <h1 className='font-semibold text-lg'>HUBS</h1>
          </div>
          <div>
            <button onClick={() => navigate("/admin/addhubs")} className='bg-[#368E88] p-2 sm:text-sm md:p-3 text-white md:font-medium rounded-md shadow-[#8a8080] shadow-md'>ADD HUBS</button>
          </div>
        </div>


        <div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Hub Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Building Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    District
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Pincode
                  </th>
                  <th scope="col" className="px-6 py-3">
                    View&Edit
                  </th>
                  <th>
                    disable
                  </th>
                </tr>
              </thead>
              <tbody>
                {hubs && hubs.map((hub) => {
                  return (
                    <tr key={hub._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {hub.hubName}
                      </th>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {hub.buildingName}
                      </th>
                      <td className="px-6 py-4">
                        {hub.district}
                      </td>
                      <td className="px-6 py-4">
                        {hub.pincode}
                      </td>
                      <td onClick={()=>{navigate(`/admin/editandviewhub/${hub._id}`)}} className="px-6 py-4 cursor-pointer text-blue-600 font-medium">
                        View&Edit
                      </td>
                      <td className="px-6 py-4 text-center text-red-600 font-xl text-xl">
                        <BiBlock/>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Hubs
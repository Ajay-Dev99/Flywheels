import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { useNavigate } from 'react-router-dom'
import { adminHubListingApi } from '../../Services/AdminApi'
import { BiBlock } from "react-icons/bi"

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


        {hubs.length > 0 ? <div>

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
                      <td onClick={() => { navigate(`/admin/editandviewhub/${hub._id}`) }} className="px-6 py-4 cursor-pointer text-blue-600 font-medium">
                        View&Edit
                      </td>
                      <td className="px-6 py-4 text-center text-red-600 font-xl text-xl">
                        <BiBlock />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

        </div> : <div role="status " className='flex justify-center h-screen items-center'>
          <svg aria-hidden="true" className="w-10 h-10 mr-2  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>}
      </div>
    </div>
  )
}

export default Hubs
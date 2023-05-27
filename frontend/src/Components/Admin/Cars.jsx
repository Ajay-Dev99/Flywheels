import React from 'react'
import AdminSidebar from './AdminSidebar'
import { useNavigate } from 'react-router-dom'


function Cars() {
  const navigate = useNavigate()
  return (
    <div>
      <AdminSidebar />
      <div className='p-2 md:p-4 sm:ml-64'>
        <div className='flex justify-between  md:py-4  md:px-24 mt-7'>
          <div className='mt-1.5'><h1 className='font-semibold text-lg'> Cars</h1></div>
          <div><button onClick={() => navigate("/admin/addcars")} className='bg-[#368E88] p-2 sm:text-sm md:p-3 text-white md:font-medium rounded-md shadow-[#8a8080] shadow-md'>ADD CARS</button></div>
        </div>

        {/* <div class="flex items-center md:justify-between justify-center py-4 bg-white dark:bg-gray-800">
            <div>

            </div>
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
              </div>
              <input type="text" id="table-search-users" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
            </div>
          </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
           
                <th scope="col" class="px-6 py-3">
                  image
                </th>
                <th scope="col" class="px-6 py-3">
                  Vehicle 
                </th>
                <th scope="col" class="px-6 py-3">
                 Vehicle Number
                </th>
                <th scope="col" class="px-6 py-3">
                 Fuel ype
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
             <td>
             <img class=" h-16 rounded-full" src="/images/banners.jpg" alt="Jese image" />

             </td>
                <td >
                  <div class="pl-3">
                    <div class="text-base font-semibold">Neil Sims</div>
                    <div class="font-normal text-gray-500">neil.sims@flowbite.com</div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  React Developer
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Online
                  </div>
                </td>
                <td class="px-6 py-4">
                  <a href="#" type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                </td>
              </tr>
             
            </tbody>
            </table>
        </div> */}
      </div>

    </div>
  
  )
}

export default Cars

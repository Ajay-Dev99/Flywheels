import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { useNavigate } from 'react-router-dom'
import { listVehicle } from '../../Services/UserApi'
import {FaTrash} from 'react-icons/fa'
import { adminDeleteVehicle } from '../../Services/AdminApi'

function Cars() {
  const navigate = useNavigate()
  const [Vehicles,setVehicles] = useState()

  useEffect(()=>{
      listVehicle().then((response)=>{
        if(response.data.status){
          const vehicle = response.data.vehicles
          setVehicles(vehicle)
        }
      })
  },[])

  const deleteCar = (id)=>{
    console.log(id,"car id");
    adminDeleteVehicle(id)
  }

  const viewAndEdit = (id)=>{
    navigate(`/admin/editvehicle/${id}`)
  }

  return (
    <div>
      <AdminSidebar />
      <div className='p-2 md:p-4 sm:ml-64'>
        <div className='flex justify-between  md:py-4  md:px-24 mt-7'>
          <div className='mt-1.5'><h1 className='font-semibold text-lg'> Cars</h1></div>
          <div><button onClick={() => navigate("/admin/addcars")} className='bg-[#368E88] p-2 sm:text-sm md:p-3 text-white md:font-medium rounded-md shadow-[#8a8080] shadow-md'>ADD CARS</button></div>
        </div>

        <div className="flex items-center md:justify-between justify-center py-4 bg-white dark:bg-gray-800">
            <div>

            </div>
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              </div>
              <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
            </div>
          </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
           
                <th scope="col" className="px-6 py-3 ">
                  image
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Vehicle 
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                 Vehicle Number
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                 Fuel ype
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Details
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
         { Vehicles &&  <tbody>
            { Vehicles.map((car)=>(

            
              <tr key={car._id} className="bg-white border-b  hover:bg-gray-50">
             <td >
             <img className=" h-16 rounded-full" src={`${process.env.REACT_APP_BASE_URL}/${car.image_url[1]}`} alt="Jese image" />

             </td>
                <td className='text-center'>
                  <div className="pl-3">
                    <div className="text-base font-semibold">{car.modelname}</div>
                    <div className="font-normal text-gray-500">{car.brand}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  {car.vehiclenumber}
                </td>
                <td className="px-6 py-4 text-center">
                  {car.fueltype}
                 
                </td>
                <td  className="px-6 py-4 cursor-pointer text-center" onClick={()=>viewAndEdit(car._id)}>
                  <span type="button"  className="font-medium text-blue-600 ">View & Edit</span>
                </td>
                <td className='text-center cursor-pointer'>
               <span type="button" onClick={()=>deleteCar(car._id)} className="font-medium text-red-600 "><FaTrash/></span>

                </td>
              </tr>
            ))  }
            </tbody>
}
            </table>
        </div>
      </div>

    </div>
  
  )
}

export default Cars

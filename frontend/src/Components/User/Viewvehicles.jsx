import React, { useEffect, useState } from 'react'
import Header from './userHeader'
import { HublistingAPI, filtercar, listVehicle } from '../../Services/UserApi'
import { useNavigate } from 'react-router-dom'
import { adminGetCategoryList } from '../../Services/AdminApi'
import { toast } from 'react-toastify'
import { BiSortDown } from 'react-icons/bi'

function Viewvehicles() {
  const navigate = useNavigate()
  const [vehicles, setvehicles] = useState()
  const [key, setKey] = useState("")
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(false)
  const [transmissionType, setTransmissionType] = useState([])
  const [fueltype, setFuelType] = useState([])
  const [categories, setCategories] = useState(false)
  const [hubs, setHubs] = useState(false)
  const [notfound, setNotFound] = useState(false)
  const limit = 3;
  function viewCar(vehicleId) {
    navigate(`/singlepage/${vehicleId}`)
  }

  useEffect(() => {
    listVehicle(key, currentPage, limit).then((response) => {
      if (response.data.status) {
        setNotFound(false)
        const vehicle = response.data.vehicle
        setvehicles(vehicle)
        setTotalPages(response.data.totalPages);
      } else {
        setNotFound(true)
      }
    })

    return (
      setvehicles(null)
    )
  }, [key, currentPage])
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return; // Invalid page number, do nothing
    }

    setCurrentPage(pageNumber);
  };

  const getCategory = async () => {
    try {
      adminGetCategoryList().then((response) => {
        setCategories(response.data.categories)
      })
    } catch (error) {
      toast(error.message)
    }
  }
  const getHubs = async () => {
    try {
      HublistingAPI().then((response) => {
        setHubs(response.data.hubs)
      })
    } catch (error) {

    }
  }

  const filterCars = (key, value) => {
    filtercar(key, value).then((response) => {
      setvehicles(response.data.vehicles)
      setTotalPages(false)
      setFilter(false)
      setTransmissionType(false)
      setCategories(false)
      setHubs(false)
      setFuelType(false)
    })
  }

  return (
    <div>
      <Header />
      <div className='mt-8'>
        <div className='p-2 bg-[#358E88] flex justify-center'><p className='text-white font-bold text-lg uppercase'>AVAILABLE CARS</p></div>
      </div>


      <div className="flex flex-col md:flex-row">

        <div className="flex-grow px-5 mt-5">
          <div> <input type="text"
            className="w-full p-2   rounded-md outline-none"
            placeholder="search..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
          /></div>
        </div>


      </div>
      <div className='relative px-5 mt-5  flex justify-end'>
        <button onClick={() => setFilter(!filter)} className=" bg-[#C0C0C0] focus:ring-4 focus:outline-black  font-medium rounded-lg  px-7 py-1.5 text-center inline-flex items-center text-gray-700 text-md" type="button"> Filter  <BiSortDown className="w-4 h-4 ml-2 mt-1 font-bold text-gray-700" /></button>

        {filter && <div className="z-50 bg-white divide-y divide-gray-100 py-5 px-6  rounded-lg shadow w-44 absolute top-full right-5 mt-1 transform translate-x-0 md:translate-x-0  md:w-auto md:mt-0 md:z-0">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 space-y-2" aria-labelledby="dropdownDefaultButton">

            <li>
              <button onClick={getCategory} className="w-full text-left py-2  bg-gray-50 text-black pl-2"> Category</button>
              {categories && categories.map((category, index) => (
                <li key={index}>
                  <span onClick={() => filterCars("category", category._id)} className="block px-4 py-2 hover:bg-gray-100 text-center">{category.categoryName}</span>
                </li>

              ))}
            </li>
            <li>
              <button onClick={() => setTransmissionType(["automatic", "manual"])} className="w-full text-left py-2  bg-gray-50 text-black pl-2  "> Transmission Type</button>
              {transmissionType && transmissionType.map((x, index) => (
                <li key={index}>
                  <span onClick={() => filterCars("Transmission", x)} className="block px-4 py-2 hover:bg-gray-100 text-center">{x}</span>
                </li>

              ))}
            </li>
            <li>
              <button onClick={() => setFuelType(["petrol", "Diesel"])} className="w-full text-left py-2  bg-gray-50 text-black pl-2  "> Fuel Type</button>
              {fueltype && fueltype.map((x, index) => (
                <li key={index}>
                  <span onClick={() => filterCars("fuel", x)} className="block px-4 py-2 hover:bg-gray-100 text-center">{x}</span>
                </li>

              ))}
            </li>
            <li>
              <button onClick={getHubs} className="w-full text-left py-2  bg-gray-50 text-black pl-2 focus-ring-4  "> Hubs</button>
              {hubs && hubs.map((hub, index) => (
                <li key={index}>
                  <span onClick={() => filterCars("hub", hub._id)} className="block px-4 py-2 hover:bg-gray-100 text-center">{hub.district}</span>
                </li>

              ))}
            </li>

          </ul>
        </div>}
      </div>


      {/* {vehicles && vehicles.length > 0 ? <div className='p-5 flex flex-wrap justify-center'>
        {vehicles.filter((vehicle) => vehicle.activeStatus).map((vehicle) => (


          <div key={vehicle._id} onClick={() => viewCar(vehicle._id)} className="max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-2/5 mb-4  border border-[#ffff]">
            <div className='border border-black'>
              <div className='flex justify-center mt-1'>   <img className=" sm:h-40 md:h-52" src={`${process.env.REACT_APP_BASE_URL}/${vehicle.image_url[0]}`} alt="" /> </div>

              <div className='flex flex-col'>
                <div className='flex justify-center'> <p className='font-bold uppercase'>{vehicle.modelname}</p> </div>
                <div className='flex justify-center'><p>{vehicle.fueltype}</p></div>
              </div>
              <div className='flex justify-center '>
                <div className="relative overflow-x-auto my-1">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

                    <tbody className='border'>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="md:px-6  px-1 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          30days or more
                        </th>
                        <td className="md:px-6  px-1 py-1">
                          {vehicle.rentfor30days}/perday
                        </td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="md:px-6  px-1 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          10 to 20 days
                        </th>
                        <td className="md:px-6  px-1 py-1">
                          {vehicle.rentfor10_20days}/perday
                        </td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="md:px-6  px-1 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          upto 10 days
                        </th>
                        <td className="md:px-6  px-1 py-1">
                          {vehicle.rentupto10days}/perday
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className='flex justify-center my-1 md:my-3'>
                    <button className='bg-[#358E88] text-white px-3 py-1 w-full shadow-md shadow-slate-500'>RENT IT</button>
                  </div>
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
        ))}
      </div> :<div role="status " className='flex justify-center'>
    <svg aria-hidden="true" className="w-10 h-10 mr-2  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
 } */}

      {vehicles && vehicles.length > 0 ? (
        <div className='p-5 flex flex-wrap justify-center'>
          {vehicles
            .filter((vehicle) => vehicle.activeStatus)
            .map((vehicle) => (
              <div
                key={vehicle._id}
                onClick={() => viewCar(vehicle._id)}
                className="max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-2/5 mb-4 border border-[#ffff]"
              >
                <div className='border border-black'>
                  <div className='flex justify-center mt-1'>
                    <img className="sm:h-40 md:h-52" src={`${process.env.REACT_APP_BASE_URL}/${vehicle.image_url[0]}`} alt="" />
                  </div>

                  <div className='flex flex-col'>
                    <div className='flex justify-center'>
                      <p className='font-bold uppercase'>{vehicle.modelname}</p>
                    </div>
                    <div className='flex justify-center'>
                      <p>{vehicle.fueltype}</p>
                    </div>
                  </div>

                  <div className='flex justify-center'>
                    <div className="relative overflow-x-auto my-1">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody className='border'>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="md:px-6 px-1 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              30days or more
                            </th>
                            <td className="md:px-6 px-1 py-1">
                              {vehicle.rentfor30days}/perday
                            </td>
                          </tr>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="md:px-6 px-1 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              10 to 20 days
                            </th>
                            <td className="md:px-6 px-1 py-1">
                              {vehicle.rentfor10_20days}/perday
                            </td>
                          </tr>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="md:px-6 px-1 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              upto 10 days
                            </th>
                            <td className="md:px-6 px-1 py-1">
                              {vehicle.rentupto10days}/perday
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className='flex justify-center my-1 md:my-3'>
                        <button className='bg-[#358E88] text-white px-3 py-1 w-full shadow-md shadow-slate-500'>RENT IT</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        !notfound && (
          <div role="status" className='flex justify-center h-screen items-center'>
            <svg aria-hidden="true" className="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )
      )}

      {notfound && <div className='flex justify-center items-center p-5 bg-[antiquewhite] mt-9 font-bold my-60'>
        NOTHING FOUND</div>}

      {totalPages && totalPages > 1 &&
        <div className="flex justify-center mb-10 overflow-x-auto">
          <button
            className="border border-black mx-4 px-2 md:px-4 font-bold"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              className={`border border-black mx-1 md:mx-4 md:px-4 px-1 font-bold ${pageNumber === currentPage && 'bg-gray-500 text-white'}`}
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}

          <button
            className="border border-black mx-4 px-2 md:px-4 font-bold"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      }

    </div>

  )
}

export default Viewvehicles

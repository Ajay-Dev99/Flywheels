import React, { useEffect, useState } from 'react'
import Header from './userHeader'
import { listVehicle } from '../../Services/UserApi'
import { useNavigate } from 'react-router-dom'

function Viewvehicles() {
  const navigate = useNavigate()
  const [key, setKey] = useState("")
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;
  function viewCar(vehicleId) {
    navigate(`/singlepage/${vehicleId}`)
  }

  const [vehicles, setvehicles] = useState()
  useEffect(() => {
    listVehicle(key, currentPage, limit).then((response) => {
      console.log(response.data);
      if (response.data.status) {
        const vehicle = response.data.vehicle
        setvehicles(vehicle)
        setTotalPages(response.data.totalPages);
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

  return (
    <div>
      <Header />
      <div className='mt-8'>
        <div className='p-2 bg-[#358E88] flex justify-center'><p className='text-white font-bold text-lg uppercase'>AVAILABLE CARS</p></div>
      </div>


      <div className="flex  justify-center items-center">
        <div className="flex-grow px-5 md:px-20 lg:px-40 mt-5">
          <div> <input type="text"
            className="w-full p-2 rounded-md outline-none"
            placeholder="search..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
          /></div>
          {/* <div className='flex justify-end mt-3'>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-black bg-[gainsboro] hover:bg-zinc-300 focus:ring-4 focus:outline-none focus:ring-[#c0c0c0]  font-light rounded-lg text-sm px-4 py-2 text-center inline-flex items-center "
              type="button"
            >
              FILTER
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div> */}

        </div>

      </div>


      {vehicles && vehicles.length > 0 ? <div className='p-5 flex flex-wrap justify-center'>
        {vehicles.map((vehicle) => (


          <div key={vehicle._id} onClick={() => viewCar(vehicle._id)} className="max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-2/5 mb-4  border border-[#ffff]">
            <div className='border border-black'>
              <div className='flex justify-center'>   <img className="rounded-t-lg sm:h-40 md:h-52" src={`${process.env.REACT_APP_BASE_URL}/${vehicle.image_url[0]}`} alt="" /> </div>
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
      </div> : <div className='flex justify-center items-center p-5 bg-[antiquewhite] mt-9 font-bold '>
        NOTHING FOUND</div>}
{ totalPages && totalPages>1 &&
        <div className="flex justify-center mb-10">
        <button
          className="border border-black mx-4 px-4 font-bold"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            className={`border border-black mx-1 md:mx-4 md:px-4 px-1 font-bold ${pageNumber === currentPage ? 'bg-gray-500 text-white' : ''}`}
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        <button
          className="border border-black mx-4 px-4 font-bold"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>}

    </div>

  )
}

export default Viewvehicles

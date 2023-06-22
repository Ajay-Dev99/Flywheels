import React, { useEffect, useState } from 'react'
import { Transmissionfilterapi } from '../../Services/UserApi';
import { useNavigate } from 'react-router-dom';

function Transmissionfilter() {
  const [vehicles, setVehicle] = useState("")
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;
  const navigate = useNavigate()

  useEffect(() => {
    getVehicle("automatic", currentPage, limit)
    return (
      setVehicle(null)
    )
  }, [currentPage])

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return; // Invalid page number, do nothing
    }

    setCurrentPage(pageNumber);
  };

  function viewCar(vehicleId) {
    navigate(`/singlepage/${vehicleId}`)
  }

  const getVehicle = (key) => {

    Transmissionfilterapi(key, currentPage, limit).then((response) => {
      if (response.data.status) {
        setVehicle(response.data.vehicles)
        setTotalPages(response.data.totalPage)
      }
    })
  }
  return (
    <div className='my-5 '>
      <div className='flex justify-center flex-col mb-3'>
        <div className='flex justify-center'> <p className='text-md'>What Kind of Car You Want</p></div>
        <div className='flex justify-center'><p className='text-2xl'>Great Rental Offers for You</p></div>
      </div>
      <div className='flex justify-center'>
        <div className='flex-grow mx-3 md:ps-32'>
          <button className='w-full bg-[#358E88] text-white md:px-10 py-2 px-2.5 focus:bg-[#A7A95A]' onClick={() => getVehicle("automatic")}>
            AUTOMATIC
          </button>
        </div>
        <div className='flex-grow mx-3 md:pe-32'>
          <button

            className='w-full bg-[#358E88] text-white md:px-12 py-2 px-3.5 focus:bg-[#A7A95A]' onClick={() => getVehicle("manual")}>
            MANUAL
          </button>
        </div>
      </div>
      {vehicles && vehicles.length > 0 && <div className='p-5 flex flex-wrap justify-center'>
        {vehicles.map((vehicle) => (


          <div key={vehicle._id} onClick={() => viewCar(vehicle._id)} className="max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-2/5 mb-4  border border-[#ffff]">
            <div className='border border-black'>
              <div className='flex justify-center mt-1'>   <img className="sm:h-40 md:h-52" src={`${process.env.REACT_APP_BASE_URL}/${vehicle.image_url[0]}`} alt="" /> </div>
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
      </div>}

      {totalPages && totalPages > 1 &&
        <div className="flex justify-center mb-10 overflow-x-auto">
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
        </div>
      }

    </div>
  )
}

export default Transmissionfilter

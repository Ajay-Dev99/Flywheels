import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { useNavigate } from 'react-router-dom';
import { listVehicle } from '../../Services/UserApi';
import { FaTrash } from 'react-icons/fa';
import { adminDeleteVehicle } from '../../Services/AdminApi';
import { toast } from 'react-toastify';

function Cars() {
  const navigate = useNavigate();
  const [Vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [vehicleId, setVehicleId] = useState('');

  useEffect(() => {
    listVehicle().then((response) => {
      if (response.data.status) {
        const vehicle = response.data.vehicle;
        setVehicles(vehicle);
      }
    });
  }, []);

  const deleteCar = (id) => {
    adminDeleteVehicle(id).then((response) => {
      if (response.data.status) {
        setShowModal(false)
        const updatedVehicles = Vehicles.map((vehicle) => {
          if (vehicle._id === id) {
            vehicle = response.data.vehicle
          }
          return vehicle;
        })
        setVehicles(updatedVehicles)
        toast.success(response.data.message);

      } else {
        toast.error(response.data.message, {
          position: 'top-center',
        });
      }
    });
  };

  const handleDeleteConfirmation = () => {
    deleteCar(vehicleId);
  };

  const viewAndEdit = (id) => {
    navigate(`/admin/editvehicle/${id}`);
  };

  const toggleModal = (id) => {
    setShowModal(!showModal);
    setVehicleId(id);
  };

  return (
    <div>
      <AdminSidebar />
      <div className='p-2 md:p-4 sm:ml-64'>
        {Vehicles.length > 0 ? <div>
          <div className='flex justify-between  md:py-4  md:px-24 mt-7'>
            <div className='mt-1.5'>
              <h1 className='font-semibold text-lg'>Cars</h1>
            </div>
            <div>
              <button onClick={() => navigate("/admin/addcars")} className='bg-[#368E88] p-2 sm:text-sm md:p-3 text-white md:font-medium rounded-md shadow-[#8a8080] shadow-md'>ADD CARS</button>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    image
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Vehicle
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Vehicle Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Fuel Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              {Vehicles && (
                <tbody>
                  {Vehicles.map((car) => (
                    <tr key={car._id} className={car.activeStatus ? "bg-white  border-b" : "bg-[#ffdada] border-b "}>
                      <td>
                        <img className="h-16" src={`${process.env.REACT_APP_BASE_URL}/${car.image_url[0]}`} alt="Jese " />
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
                      <td className="px-6 py-4 cursor-pointer text-center" onClick={() => viewAndEdit(car._id)}>
                        <span type="button" className="font-medium text-blue-600">{car.activeStatus ? "View & Edit" : "View"}</span>
                      </td>
                      <td className='flex justify-center cursor-pointer'>


                        {car.activeStatus && <button onClick={() => toggleModal(car._id)} data-modal-target="popup-modal" data-modal-toggle="popup-modal" className="block text-red-600 bg-white hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3" type="button">
                          <span type="button" className="font-medium"><FaTrash /></span>
                        </button>}

                        {showModal && vehicleId === car._id && (
                          <div id="popup-modal" className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

                            <div className="relative w-full max-w-md max-h-full">
                              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button onClick={toggleModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                  </svg>
                                  <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-6 text-center">
                                  <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                  </svg>
                                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                                  <button onClick={handleDeleteConfirmation} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                    Yes, I'm sure
                                  </button>
                                  <button onClick={toggleModal} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
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
  );
}

export default Cars;

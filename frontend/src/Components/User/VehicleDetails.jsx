import React, { useEffect, useState } from 'react'
import Header from './userHeader'
import { useNavigate, useParams } from 'react-router-dom'
import { viewVehicle } from '../../Services/UserApi';
import { toast } from 'react-toastify';

function VehicleDetails() {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState()
    const [activeImg, setActiveImage] = useState()
    const navigate = useNavigate()


    useEffect(() => {

        viewVehicle(id).then((response) => {
            if (response.data.status) {
                setVehicle(response.data.vehicle)
                setActiveImage(response.data.vehicle.image_url[0])
            } else {
                toast.error(response.data.message, {
                    position: "top-center"
                })
            }
        })

    }, [id])

    // const [amount, setAmount] = useState(1);
    return (
        <div>

            <Header />
            {vehicle ? <div>
                {vehicle && <div className='mt-8'>
                    <div className='p-2 bg-[#358E88] flex justify-center'><p className='text-white font-bold text-lg uppercase'>{vehicle.brand} {vehicle.modelname}</p></div>
                </div>}
                <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center md:p-5 border rounded-md border-[#c0c0c0] md:m-5 '>
                    {vehicle && <div className='flex flex-col gap-6 lg:w-2/4'>
                        <div className='md:p-4 relative'>  <img src={`${process.env.REACT_APP_BASE_URL}/${activeImg}`} alt="" className='w-auto  md:w-full h-auto md:h-96 aspect-square object-contain rounded-xl' />
                            <span className="absolute top-2 right-0 bg-red-500 text-white py-1 px-2 rounded-full text-xs font-bold">
                                {`Available in ${vehicle.hub.district} only`}
                            </span>
                        </div>
                        <div className='flex flex-row justify-center  h-24'>
                            {vehicle.image_url.map((image, index) => (
                                <div key={index} className='border border-black mx-3 object-cover'>  <img src={`${process.env.REACT_APP_BASE_URL}/${image}`} alt="" className='w-24 h-24  cursor-pointer' onClick={() => setActiveImage(image)} /> </div>
                            ))}
                        </div>
                    </div>
                    }
                    {vehicle && <div className='flex flex-col justify-center items-center gap-4 lg:w-2/4 px-2 py-8 bg-[#f4f4f4]' >
                        <div>
                            <span className=' text-violet-600 font-semibold'>{vehicle.brand}</span>
                            <h1 className='text-3xl font-bold'>{vehicle.modelname}</h1>
                        </div>
                        <div className='leading-8 '>
                            <p className='text-gray-700'>
                                Vehicle Number : {vehicle.vehiclenumber}
                            </p>
                            <p className='text-gray-700'>
                                Vehicle Modelname : {vehicle.modelname}
                            </p>
                            <p className='text-gray-700'>
                                Vehicle ModelYear : {vehicle.modelyear}
                            </p>
                            <p className='text-gray-700'>
                                Vehicle Brand : {vehicle.brand}
                            </p>
                            <p className='text-gray-700'>
                                Vehicle FuelType : {vehicle.fueltype}
                            </p>
                            <p className='text-gray-700'>
                                Vehicle DrivenKM : {vehicle.drivenKM}
                            </p>
                            <p className='text-gray-700'>
                                Vehicle Transmission Type : {vehicle.transmissiontype}
                            </p>
                            <p className='text-gray-700'>
                                Vehicle Category : {vehicle.categoryId.categoryName}
                            </p>
                            <p className='text-gray-700'>
                                Rent for 30 Days or More : {vehicle.rentfor30days}
                            </p>
                            <p className='text-gray-700'>
                                Rent for 10 to 20 Days : {vehicle.rentfor10_20days}
                            </p>
                            <p className='text-gray-700'>
                                Rent upto 10 Days : {vehicle.rentupto10days}
                            </p>
                        </div>
                        {vehicle.bookedStatus ? <div className='flex flex-row items-center '>
                            <button className='bg-red-300 text-red-700 font-bold py-3 px-[7rem] h-full'>THIS VEHICLE IS CURRENTLY NOT AVAILABLE.TRY AGAIN LATER</button>
                        </div> : <div className='flex flex-row items-center gap-12 '>
                            <button onClick={() => navigate(`/bookacar/${vehicle._id}`)} className='bg-[#358E88] text-white font-semibold py-3 px-[7rem] h-full '>Book Now</button>
                        </div>
                        }
                    </div>
                    }
                </div>
            </div> : <div role="status " className='flex justify-center h-screen items-center'>
                <svg aria-hidden="true" className="w-10 h-10 mr-2  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>}
        </div>
    )
}

export default VehicleDetails

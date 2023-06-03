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
        
            <Header/>
            { vehicle &&<div className='mt-8'>
        <div className='p-2 bg-[#358E88] flex justify-center'><p className='text-white font-bold text-lg uppercase'>{vehicle.brand} {vehicle.modelname}</p></div>
      </div>}
           <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center md:p-5 border rounded-md border-[#c0c0c0] md:m-5 '>
      { vehicle && <div className='flex flex-col gap-6 lg:w-2/4'>
          <div className='md:p-4'>  <img src={`${process.env.REACT_APP_BASE_URL}/${activeImg}`} alt="" className='w-auto  md:w-full h-auto md:h-96 aspect-square object-contain rounded-xl'/> </div>
            <div className='flex flex-row justify-center  h-24'>
                {vehicle.image_url.map((image,index)=>(
                      <div key={index} className='border border-black mx-3 object-cover'>  <img  src={`${process.env.REACT_APP_BASE_URL}/${image}`} alt="" className='w-24 h-24  cursor-pointer' onClick={() => setActiveImage(image)}/> </div>
                ))}
            </div> 
        </div>
       }
       { vehicle && <div className='flex flex-col justify-center items-center gap-4 lg:w-2/4 px-2 py-8 bg-[#f4f4f4]' >
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
            <div className='flex flex-row items-center gap-12 '>
               <button onClick={()=>navigate(`/bookacar/${vehicle._id}`)} className='bg-[#358E88] text-white font-semibold py-3 px-[7rem] h-full '>Book Now</button>
            </div>
        </div>
      }
    </div>
     </div>
    )
}

export default VehicleDetails

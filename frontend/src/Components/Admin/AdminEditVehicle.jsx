import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import AdminSidebar from './AdminSidebar'
import { adminEditCar, adminGetCategoryList, adminviewVehicleDetails } from '../../Services/AdminApi'
import { useNavigate, useParams } from 'react-router-dom'
import {FaArrowCircleLeft} from 'react-icons/fa'

function AdminEditVehicle() {
    const navigate = useNavigate()
    const [categories, setCategories] = useState()
    const [vehicleImage, setVehicleImage] = useState()
    const [imagePreviews, setImagePreviews] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [vehicleActiveStatus,setVehicleActiveStatus] = useState(false)
    const initialValues = {
        modelname: "",
        brand: "",
        fueltype: "",
        transmissionType: "",
        TotalKm: "",
        rent30daysormore: "",
        rent10to20days: "",
        rentupto10days: "",
        vehiclenumber: "",
        category: "",
    }
    const { id } = useParams()
    useEffect(() => {

        adminviewVehicleDetails(id).then((response) => {
            if (response.data.status) {
                const car = response.data.vehicle
                formik.setValues({
                    modelname: car.modelname,
                    brand: car.brand,
                    fueltype: car.fueltype,
                    transmissionType: car.transmissiontype,
                    TotalKm: car.drivenKM,
                    rent30daysormore: car.rentfor30days,
                    rent10to20days: car.rentfor10_20days,
                    rentupto10days: car.rentupto10days,
                    vehiclenumber: car.vehiclenumber,
                    category: car.categoryId._id,
                })
                setVehicleImage(car.image_url)
                if(car.activeStatus){
                    setVehicleActiveStatus(true)
                }
            }
        }

        )

        adminGetCategoryList().then((response) => {
            if (response.data.status) {
                setCategories(response.data.categories)
            } else {
                toast.error(response.data.message, {
                    position: "top-center"
                })
            }
        })

    }, [])

    const handleImagePreview = (event, index) => {
        const file = event.target.files[0];
      
        const previews = [...imagePreviews];
        previews[index] = URL.createObjectURL(file);
        setImagePreviews(previews);
      
        const selected = [...selectedImages];
        selected[index] = file;
        setSelectedImages(selected);
      };

    const validationSchema = Yup.object().shape({
        modelname: Yup.string().required(),
        brand: Yup.string().required(),
        fueltype: Yup.string().required(),
        transmissionType: Yup.string().required(),
        TotalKm: Yup.number()
            .typeError('Please enter a valid number')
            .required('This field is required'),
        rent30daysormore: Yup.number()
            .typeError('Please enter a valid number')
            .required('This field is required'),
        rent10to20days: Yup.number()
            .typeError('Please enter a valid number')
            .required('This field is required'),
        rentupto10days: Yup.number()
            .typeError('Please enter a valid number')
            .required('This field is required'),
        vehiclenumber: Yup.string()
            .strict(true)
            .trim('Name must not contain white space')
            .test('no-whitespace', 'Name must not contain white space', (value) => !/\s/.test(value)),
        // category: Yup.string().required(),
    })


    const onSubmit = async (values) => {
        // values.category=values.category._id
        const formData = new FormData()
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
          });
        
          selectedImages.forEach((image, index) => {
            
            formData.append('image', image,`image${index}.jpg`);
          });
        
          adminEditCar(formData,id).then((response)=>{
                if(response.data.status){
                    toast(response.data.message)
                    navigate("/admin/viewcars")
                }else{
                    toast.error(response.data.message,{
                        position:'top-center'
                    })
                }
          })

        
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })


    return (
        <div>
            <AdminSidebar />
            <div className='p-4 sm:ml-64 flex flex-col'>
                <div className='flex justify-between px-5'><div className='font-bold'>EDIT CAR</div><div onClick={()=> navigate("/admin/viewcars")} className='font-bold cursor-pointer'><FaArrowCircleLeft/></div></div>
                {initialValues && <div className='border border-[#c0bebc] rounded-md shadow-md mt-3 p-4'>
                    <form action="" onSubmit={formik.handleSubmit} method="post" >
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="">Model Name</label>
                                <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.modelname} name="modelname" id="floating_first_name" className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border" placeholder=" " required />
                                {formik.touched.modelname && formik.errors.modelname ? <p className="text-sm text-red-600">{formik.errors.modelname}</p> : null}

                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="">Brand</label>
                                <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.brand} name="brand" id="floating_first_name" className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border" placeholder=" " required />
                                {formik.touched.brand && formik.errors.brand ? <p className="text-sm text-red-600">{formik.errors.brand}</p> : null}

                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="">Fuel Type</label>
                                <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fueltype} name="fueltype" id="floating_first_name" className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border" placeholder=" " required />
                                {formik.touched.fueltype && formik.errors.fueltype ? <p className="text-sm text-red-600">{formik.errors.fueltype}</p> : null}

                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="">Transmission Type</label>
                                {/* <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border" placeholder=" " required /> */}
                                <select name="transmissionType" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.transmissionType} id="transmissionType" className="block py-2 px-1 w-full text-sm text-gray-900 bg-transparent border" placeholder={`${formik.values.transmissionType}`} required>
                                    {/* <option value=""></option> */}
                                    <option value="automatic">Automatic</option>
                                    <option value="manual">Manual</option>
                                </select>
                                {formik.touched.transmissionType && formik.errors.transmissionType ? <p className="text-sm text-red-600">{formik.errors.transmissionType}</p> : null}

                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="">Total Kms Driven</label>
                                <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.TotalKm} name="TotalKm" id="floating_first_name" className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border" placeholder=" " required />
                                {formik.touched.TotalKm && formik.errors.TotalKm ? <p className="text-sm text-red-600">{formik.errors.TotalKm}</p> : null}

                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="">Per Day Rent For 30 Days Or More</label>
                                <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rent30daysormore} name="rent30daysormore" id="floating_first_name" className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border" placeholder=" " required />
                                {formik.touched.rent30daysormore && formik.errors.rent30daysormore ? <p className="text-sm text-red-600">{formik.errors.rent30daysormore}</p> : null}

                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="">Per Day Rent For 10 to 20 Days</label>
                                <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rent10to20days} name="rent10to20days" id="floating_first_name" className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border" placeholder=" " required />
                                {formik.touched.rent10to20days && formik.errors.rent10to20days ? <p className="text-sm text-red-600">{formik.errors.rent10to20days}</p> : null}

                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="">Per Day Rent Upto 10 Days</label>
                                <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rentupto10days} name="rentupto10days" id="floating_first_name" className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border" placeholder=" " required />
                                {formik.touched.rentupto10days && formik.errors.rentupto10days ? <p className="text-sm text-red-600">{formik.errors.rentupto10days}</p> : null}

                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="">Vehicle Number</label>
                            <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.vehiclenumber} name='vehiclenumber' className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border" required />
                            {formik.touched.vehiclenumber && formik.errors.vehiclenumber ? <p className="text-sm text-red-600">{formik.errors.vehiclenumber}</p> : null}

                        </div>
                        <div className="mb-6">
                            <label htmlFor="">Category</label>
                            {categories &&
                                <select onChange={formik.handleChange}  onBlur={formik.handleBlur}  value={formik.values.category}  name='category' id="category" className="block py-2 px-1 w-full text-sm text-gray-900 bg-transparent border" placeholder={`${formik.values.category}`} required>

                                    {categories.map((category) => (

                                        <option key={category._id} value={category._id}>{category.categoryName}</option>
                                    ))}

                                </select>
                            }
                            {formik.touched.category && formik.errors.category ? <p className="text-sm text-red-600">{formik.errors.category}</p> : null}

                        </div>
                        {vehicleImage && <div className="mb-6">

                            {vehicleImage.map((image, index) => (

                                <div key={index} className='w-full'>
                                    <div className='border border-black my-1'>
                                        {imagePreviews[index] ? <img src={imagePreviews[index]} alt="" className='max-h-60 w-full object-contain' /> : <img src={`${process.env.REACT_APP_BASE_URL}/${image}`} alt="" className='max-h-60 w-full object-contain' />}
                                    </div>
                                  { vehicleActiveStatus && <input type="file" name={`image[${index}]`} className="block my-1 px-0 w-full text-sm text-gray-900 bg-transparent border border-black" onChange={(event) => handleImagePreview(event, index)}  /> }
                            
                                </div>))
                            }

                        </div>
                        }
                      {  vehicleActiveStatus && <div className='flex justify-end'>
                            <button type='submit' className='bg-[#368E88] text-white p-2 rounded-md'>Submit</button>
                        </div>}
                    </form>
                </div>}
            </div>
        </div>

    )
}

export default AdminEditVehicle

import React from 'react'
import Header from './userHeader'

function UserProfile() {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div className='flex justify-between px-12 py-4 me-1'>
                <div className='px-7 bg-[#358e88] py-2 w-full rounded-md text-center text-white'>
                    Profile
                </div>
                <div className='bg-[#358e88] px-7 ms-1 py-2 rounded-md text-white w-full text-center'>
                    Settings
                </div>
            </div>

            <div className='flex flex-col  md:px-96 px-7 '>
                <div className=' py-2  px-7 bg-gray-100 border border-gray-300'>
                    <div className='rounded my-3 flex justify-center items-center'><img src="https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg" className='rounded-full w-40 h-40 ' alt="" /></div>
                    {/* <div className='flex flex-col justify-center items-center mb-4'>
                        <div className='my-2' ><input type="text" placeholder='Ajay Dev' className='w-60 placeholder-black text-center' /></div>
                        <div className='my-2'><input type="text" placeholder='ajaydev@gmail.com' className='w-60 placeholder-black text-center' /></div>
                    </div> */}
                </div>
                <div className='bg-gray-100 p-4 border border-gray-300'>

                    <div className=" w-full">
                        <div className="py-4 ">
                            <label htmlFor="name" className="text-sm text-gray-600">
                                Name
                            </label>
                            <input
                                className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
                                type="text"
                                value=""
                                name="name"
                            />
                        </div>
                        <hr className="border-gray-200" />
                        <div className="py-8 ">
                            <label htmlFor="email" className="text-sm text-gray-600">
                                Email Address
                            </label>
                            <input
                                className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
                                type="email"
                                name="email"
                                value=""
                            />
                        </div>
                        <hr className="border-gray-200" />

                    </div>
                </div>
            </div>
        </div>


    )
}

export default UserProfile




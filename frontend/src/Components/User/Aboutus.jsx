import React from 'react'

function Aboutus() {
    return (
        <div>
            <div className='bg-[#14181C] p-10 mt-1 md:m-3 flex flex-col md:flex-row flex-wrap'>
                <div className='text-white flex-1 p-5 flex flex-col justify-center items-center order-2'>
                    <h5 className=' text-[0.65rem] md:text-lg my-1'>Fly Wheels ! Prominent Rent a Car Provider in Kerala.</h5>
                    <h2 className='text-[1rem] md:text-2xl my-1'>Welcome to FLY WHEEL </h2>
                    <p className='text-sm my-1'>Are you looking to rent a car in Kerala? Then, you have come to the right place. The premium rental services provides car booking in calicut and other locations of the state. With attractive prices, our car rental services remove those frustrating transport woes from the minds of NRIs and tourists.</p>
                    <p className='my-2'>Rent a Car in Kerala</p>
                    <p className='text-sm my-1'>If you want automatic cars or those without drivers for rent in Kerala, we are the best players to rely on. We understand the hardships of travelers stranded in a foreign land as our company’s origin itself could be traced back to a similar incident. The company was born when Mr. Biju Sebastian, our respected founder, noticed the trials and tribulations faced by a non-resident Keralite over a taxi he had opted for.</p>
                    <div className='mt-5'>
                        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                SEE ALL VEHICLES
                            </span>
                        </button>
                    </div>
                </div>
                <div className='flex-1 p-5 md:p-10 flex justify-center items-center order-1'>
                    <img src="/images/aboutpagecars.jpg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Aboutus

import React from 'react'

function Banner() {
    return (
        <div>
            <div className='px-0 md:px-2 relative w-full mt-5 flex items-center justify-center'>
                <img src="/images/Banner.jpg" alt="Banner Image" className=" h-auto object-contain max-w-full overflow-hidden  md:w-auto w-full" />
            </div>
            <div className='md:flex flex-col justify-center md:items-center md:flex-row mt-8'> 

                <div className='mx-4 my-3  text-center '>
                    <div className="block rounded-md p-2 md:p-10 bg-[#368E88]  shadow  ">
                        <h3 className=" text-sm  font-bold tracking-tight text-white">24/7 CAR SUPPORT</h3>
                    </div>
                </div>
                <div className='mx-4 my-3 text-center '>
                    <div className="block p-2 rounded-md md:p-10 bg-[#368E88]  shadow  ">
                        <h3 className=" text-sm  font-bold tracking-tight text-white">RESERVATION ANYTIME</h3>
                    </div>
                </div>
                <div className='mx-4 my-3 text-center '>
                    <div className="block rounded-md p-2 md:p-10 bg-[#368E88]  shadow  ">
                        <h3 className=" text-sm  font-bold tracking-tight text-white">LOTS OF LOCATIONS</h3>
                    </div>
                </div>
   
            </div>
          
        </div>
    )
}

export default Banner

import React from 'react'

function Banner() {
    return (
        <div>
            <div className='px-0 md:px-2 relative w-full flex items-center justify-center'>
                <img src="/images/Banners.jpg" alt="Banner Image" className=" h-auto overflow-hidden  md:h-[30rem] w-auto" />
            </div>
            <div className='md:flex flex-col justify-center md:items-center md:flex-row mt-8'>

                <div className='mx-4 my-3 text-center '>
                    <a href="#" className="block p-2 md:p-10 bg-[#368E88]  shadow  ">
                        <h3 className="mb-2 text-sm  font-bold tracking-tight text-white">24/7 CAR SUPPORT</h3>
                    </a>
                </div>
                <div className='mx-4 my-3 text-center '>
                    <a href="#" className="block p-2 md:p-10 bg-[#368E88]  shadow  ">
                        <h3 className="mb-2 text-sm  font-bold tracking-tight text-white">RESERVATION ANYTIME</h3>
                    </a>
                </div>
                <div className='mx-4 my-3 text-center '>
                    <a href="#" className="block p-2 md:p-10 bg-[#368E88]  shadow  ">
                        <h3 className="mb-2 text-sm  font-bold tracking-tight text-white">LOTS OF LOCATIONS</h3>
                    </a>
                </div>
   
            </div>
          
        </div>
    )
}

export default Banner

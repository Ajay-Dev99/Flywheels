import React, { useEffect, useState } from 'react'
import Header from './userHeader'
import { HublistingAPI } from '../../Services/UserApi'
import Userfooter from './Userfooter'
function OurHubs() {

  const [hubs, setHubs] = useState()

  useEffect(() => {
    try {
      HublistingAPI().then((response) => {
        if (response.data.status) {
          setHubs(response.data.hubs)
        }
      })
    } catch (error) {

    }
  }, [])


  return (
    <div>
      <Header />
      <div className='bg-[#577590]  text-white flex flex-col items-center'>

        {hubs && <div className='my-5'>

          {hubs.map((hub) => (
            <div key={hub._id} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 my-5">
              <img className="object-cover w-full rounded-t-lg zm:h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={`${process.env.REACT_APP_BASE_URL}/${hub.imageURL}`} alt="" />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold  text-gray-900 dark:text-white text-center">{hub.hubName} {hub.district}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">We are delighted to inform you that we are located in {hub.district} and offer door delivery services across the entire district. Whether you're in <span className="font-bold text-yellow-400">{hub.district}</span> city or any other area within the district, you can enjoy the convenience of having your items delivered directly to your doorstep.


                  <div className='text-white text-center bg-[#f94144] my-4 p-2'>
                    {hub.hubName},{hub.buildingName
                    },{hub.street},{hub.district},{hub.pincode}
                  </div>
                </p>
              </div>
            </div>
          ))
          }

        </div>}

      </div>
      <Userfooter />
    </div>
  )
}

export default OurHubs

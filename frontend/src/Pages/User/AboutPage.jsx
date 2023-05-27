import React from 'react'
import Header from '../../Components/User/userHeader'
import Aboutus from '../../Components/User/Aboutus'

function AboutPage() {
  return (
    <div className='h-screen'>
      <div className='mb-2'>
      <Header/>
      </div>
      <div className='md:mt-24 '>
        <Aboutus/>
      </div>
    </div>
  )
}

export default AboutPage

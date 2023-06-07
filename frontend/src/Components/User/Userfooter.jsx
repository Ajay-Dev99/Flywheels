import React from 'react'

function Userfooter() {
  return (
    <div className='flex flex-col sm:flex-row justify-center items-center bg-[#E8E8E8] text-gray-600 p-5 mt-5'>
    <div className="flex flex-col justify-center  w-full sm:w-1/3  mx-3 my-3">
      <h1>OUR HIGHLIGHTS</h1>
      <div className="text-sm sm:text-base">
        <p>Fly Wheel is a premium car rental service based in Kerala. The premium rental services provide car booking in Calicut and other locations of the state with attractive prices.</p>
        <p>Baby Car Seat is available for rent.</p>
        <p>For Booking Call: +91 000000000</p>
      </div>
    </div>
    <div className="flex flex-col justify-center md:items-center w-full sm:w-1/3 mx-3 my-3">
  <div>
  <h1>WORKING HOURS</h1>
      <p>Monday After 10 am</p>
      <p>Tuesday After 10 am</p>
      <p>Wednesday After 10 am</p>
      <p>Thursday After 10 am</p>
      <p>Friday After 10 am</p>
      <p>Saturday After 10 am</p>
      <p>Sunday After 10 am</p>
  </div>
    </div>
    <div className="flex flex-col justify-center md:items-center w-full sm:w-1/3 mx-3 my-3">
<div>
<h1>OUR CONTACTS</h1>
      <p>Fly Wheels</p>
      <p>Calicut, Kerala</p>
      <p>Phone: 00000000</p>
      <p>Mobile: +91 0000000</p>
      <p>Email: flywheels@gmail.com</p>
</div>
    </div>
  </div>
  
  )
}

export default Userfooter

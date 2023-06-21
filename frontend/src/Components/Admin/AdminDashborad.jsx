import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import { AdminDashboard } from '../../Services/AdminApi';
import faker from 'faker';
import { Line } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler);
function AdminDashborad() {
  const [bookingData, setBookingData] = useState([])
  const [TotalUser, setTotalUser] = useState()
  const [Totalvehicle, setTotalVehicle] = useState()
  const [TotalOrders, setTotalOrder] = useState()
  const [datacount, setdatacount] = useState(false)
  const [labels, setLabels] = useState(false)
  const [count, setCount] = useState(false)


  const bookingsPerDay = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'No of bookings',
        data: count,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,

      },
    },
  }

  const bookingStatus = {
    labels: ['cancelled', 'picked up', 'dropeed of'],
    datasets: [
      {
        label: 'Count',
        data: datacount,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    try {
      AdminDashboard().then((response) => {
        try {
          if (response.data.status) {
            let label = [];
            let noofBookings = [];
            response.data.bookingCountPerDay.map((booking) => {
              return (
                label.push(booking._id),
                noofBookings.push(booking.count))

            })
            console.log(label, noofBookings);

            setLabels(label)
            setCount(noofBookings)
            setBookingData(response.data.bookingCountPerDay)
            setTotalUser(response.data.totalUser)
            setTotalVehicle(response.data.totalVehicle)
            setTotalOrder(response.data.totalOrders)
            setdatacount(response.data.count)
          }
        } catch (error) {

        }
      })
    } catch (error) {
      toast(error.message)
    }
  }, [])

  return (
    <div>
      <AdminSidebar />
      <div className="p-4 sm:ml-64">
        <div className='mt-3 ms-4'><h1 className='font-bold text-xl'>Dash Board</h1></div>
        <div className='flex flex-col md:flex-row justify-center mt-5'>
          {TotalUser && <div className='text-center py-7 md:py-6 px-9 md:px-24 m-3 bg-[#0079FF] text-white font-bold rounded-md text-xl'><p>{TotalUser}</p> <p>Total Users</p></div>}
          {Totalvehicle && <div className='text-center py-7 md:py-6 px-9 md:px-24 m-3 bg-[#00DFA2] text-white font-bold rounded-md text-xl'><p>{Totalvehicle}</p> <p>Total Vehicle</p></div>}
          {TotalOrders && <div className='text-center py-7 md:py-6 px-9 md:px-24 m-3 bg-[#FF0060] text-white font-bold rounded-md text-xl'><p>{TotalOrders}</p> <p>Total Bookings</p></div>}
        </div>

        {datacount && <div>
          <div className='flex justify-center md:flex-row flex-col  items-center mt-24  container'>

            <div className='pe-7 text-center space-y-7'>
              <span className='font-bold text-lg text-center'> Booking per Day</span>
              <Line className='w-[632px] h-[316px]' options={options} data={bookingsPerDay} />
            </div>
            <div className='ps-7 text-center space-y-7'>
              <span className='font-bold text-lg text-center '> Bookings Status</span>

              <Pie data={bookingStatus} />
            </div>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default AdminDashborad

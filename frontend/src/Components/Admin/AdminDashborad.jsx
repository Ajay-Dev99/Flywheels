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

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    try {
      setLoading(true)
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

            setLabels(label)
            setCount(noofBookings)
            setBookingData(response.data.bookingCountPerDay)
            setTotalUser(response.data.totalUser)
            setTotalVehicle(response.data.totalVehicle)
            setTotalOrder(response.data.totalOrders)
            setdatacount(response.data.count)

            setLoading(false)
          } else {
            toast.error(response.data.message)
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
        {!loading ? <div>
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
        </div> : <div role="status " className='flex justify-center h-screen items-center'>
          <svg aria-hidden="true" className="w-10 h-10 mr-2  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>}
      </div>
    </div>
  )
}

export default AdminDashborad

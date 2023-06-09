import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { adminsideUserList, apiUserBlock } from '../../Services/AdminApi'
import { toast } from 'react-toastify'

function UserList() {
  const [users, setUsers] = useState()
  const [showModal, setShowModal] = useState(false)
  const [userId, setUserId] = useState("")

  useEffect(() => {
    adminsideUserList().then((response) => {
      if (response.data.status) {
        setUsers(response.data.users)
      } else {
        toast.error(response.data.message, {
          position: "top-center"
        })
      }
    })
  }, [])

  const handleBlockUser = (userid) => {
    setShowModal(!showModal)
    setUserId(userid)
  }

  const confirmBlock = () => {
    try {
      apiUserBlock(userId).then((response) => {
        setShowModal(false)
        const updatedUser = users.map((user) => {
          if (user._id === userId) {
            user = response.data.user
          }
          return user;
        })
        setUsers(updatedUser)
      })
    } catch (error) {

    }
  }


  return (
    <div>
      <AdminSidebar />
      <div className='p-4 sm:ml-64'>
        <div className=' font-bold mt-7 px-6'> Users </div>

        {users ? <div className="relative overflow-x-auto  md:py-4  mt-7">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User name
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Email Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Verified Status
                </th>
                <th scope="col" className="px-6 py-3">

                </th>
              </tr>
            </thead>
            {users && <tbody>
              {
                users.map((user) => (


                  <tr key={user._id} className={user.blockStatus ? "bg-[#ffdada]" : "bg-white border-b"}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {user.name}
                    </th>
                    <td className="px-6 py-4">
                      {user.phone_number}
                    </td>
                    <td className="px-6 py-4">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">

                      {user.verified ? <span className='text-green-700 font-bold'>True</span> : <span>False</span>}
                    </td>
                    <td className="px-6 py-4">
                      <button data-modal-target="popup-modal" data-modal-toggle="popup-modal" onClick={() => handleBlockUser(user._id)} className={user.blockStatus ? 'bg-green-600 px-3 py-1 text-white rounded-md shadow-md shadow-gray-600 w-32' : 'bg-red-600 px-3 py-1 text-white rounded-md shadow-md shadow-gray-600 w-32'}>{user.blockStatus ? "Unblock" : "Block"}</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>}
          </table>
        </div> : <div role="status " className='flex justify-center h-screen items-center'>
          <svg aria-hidden="true" className="w-10 h-10 mr-2  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>}

        {showModal &&
          <div id="popup-modal" className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

            <div className="relative w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button" onClick={() => setShowModal(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6 text-center">
                  <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure ?</h3>
                  <button onClick={() => confirmBlock()} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                    Yes, I'm sure
                  </button>
                  <button data-modal-hide="popup-modal" type="button" onClick={() => setShowModal(false)} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                </div>
              </div>
            </div>
          </div>
        }



      </div>
    </div>
  )
}

export default UserList

import React from 'react'
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { userHeader } from '../../Services/UserApi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setUserDetails } from '../../features/setUser';
import { FaUserCircle } from 'react-icons/fa'

function Header() {
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false)
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.value)



  const UserLogOut = () => {
    localStorage.removeItem("jwt")
    dispatch(setUserDetails(null))
    setToggle(false)
    navigate("/")
  }

  const userLogin = () => {
    navigate("/login")
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

      userHeader().then((response) => {
      if (response.data.status) {
        dispatch(setUserDetails(response.data.user))
      }
      
      if(response.data.loginfail){
        localStorage.removeItem("jwt")
      }

    }).catch((error) => {
      toast(error.message)
    })

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className='sticky z-50 top-0 shadow-lg shadow-[#3331314f]' >
      <nav className={`sticky z-50 top-0  transition-colors duration-300 ${scrolled ? 'bg-[#ffff]' : 'bg-transparent'
        }`}>

        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">
          <a href="" className="flex items-center">
            <img src="/images/Logo.png" className="md:h-12 max-sm:h-10  max-xl:h-12 mr-3" alt="" />
          </a>

          <div className="flex items-center md:order-2">
            
          { user ? <div>
              <button type="button" onClick={() => setToggle(!toggle)} className="flex mr-3 text-sm  rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                <span className="sr-only">Open user menu</span> 
                <img className="w-8 h-8 rounded-full" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="user photo" />
              </button>
            </div>:   
             <div onClick={userLogin} className="flex cursor-pointer  items-center md:order-2  mr-3 font-bold md:mr-0 text-sm  rounded-full">
                <button >
                  <FaUserCircle className='w-6 h-6 text-[#6b7280]' />
                </button>
                  <span className='ml-2 text-xs'>Signin</span>
              </div>
            
          }
              {toggle &&
                <div className="z-50 absolute top-10 right-5 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">{user.name}</span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Bookings</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Get in touch</a>
                    </li>
                    <li>
                      <span onClick={UserLogOut} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'>Sign out</span>
                    </li>
                  </ul>
                </div> } 
              
              

            <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-1 ml-1 text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 " aria-controls="mobile-menu-2" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5  " aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            </button>
          </div>


          <div className=" z-50 items-center rounded-lg  bg-white md:bg-transparent justify-between hidden  md:flex md:w-auto md:order-1  md:relative md:top-0 absolute top-10 right-3.5 w-[47%]  " id="mobile-menu-2">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4   md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent   ">
              <li onClick={()=>navigate("/")}>
                <span className= "text-sm py-2 pl-3 pr-4 text-gray-600 rounded md:bg-transparent md:text-black  md:p-0 hover:cursor-pointer" aria-current="page">Home</span>

              </li>
              <li onClick={()=>navigate("/aboutus")}>
                <span className= "text-sm py-2 pl-3 pr-4 text-gray-600 rounded md:bg-transparent md:text-black  md:p-0 hover:cursor-pointer" aria-current="page">About Us</span>

              </li>
              <li onClick={()=>navigate("/viewvehicles")}>
                <span className= "text-sm py-2 pl-3 pr-4 text-gray-600 rounded md:bg-transparent md:text-black  md:p-0 hover:cursor-pointer" aria-current="page">Car For Rent</span>
              </li>
              <li>
                <span className= "text-sm py-2 pl-3 pr-4 text-gray-600 rounded md:bg-transparent md:text-black  md:p-0 hover:cursor-pointer"  aria-current="page">Model Category</span>
              </li>
              <li>
                <span className= "text-sm py-2 pl-3 pr-4 text-gray-600 rounded md:bg-transparent md:text-black  md:p-0 hover:cursor-pointer"  aria-current="page">Contact Us</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header

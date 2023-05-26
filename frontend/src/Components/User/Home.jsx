import React, { useEffect } from 'react'
import Header from './userHeader'
import Banner from './Banner'
import Aboutus from './Aboutus'
import { Home } from '../../Services/UserApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setUserDetails } from '../../features/setUser'

function UserHome() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // useEffect(()=>{
  //   Home().then((response)=>{
     
  //       if(response.data.loginfail){
  //         localStorage.removeItem("jwt")
  //       }
  //     }).catch((error)=>{
  //       toast(error.message)
  //     })
  // },[])

  const user = useSelector((state)=>state.user.value)


  return (
    <div>
      <Header/>
     <Banner/>
     <Aboutus/>
    </div>
  )
}

export default UserHome

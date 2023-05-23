import React, { useEffect } from 'react'
import Header from './userHeader'
import Banner from './Banner'
import Aboutus from './Aboutus'
import { Home } from '../../Services/UserApi'
import { useNavigate } from 'react-router-dom'

function UserHome() {
  const navigate = useNavigate()
  useEffect(()=>{
        Home().then((response)=>{
        console.log(response.data);
        if(response.data.loginfail){
          localStorage.removeItem("jwt")
          navigate("/login")
        }
      })
  },[])

  return (
    <div>
      <Header/>
     <Banner/>
     <Aboutus/>
    </div>
  )
}

export default UserHome

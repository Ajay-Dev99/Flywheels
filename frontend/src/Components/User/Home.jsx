import React from 'react'
import Header from './userHeader'
import Banner from './Banner'
import Aboutus from './Aboutus'
import Transmissionfilter from './Transmissionfilter'
import Userfooter from './Userfooter'

function UserHome() {
  // useEffect(()=>{
  //   Home().then((response)=>{
     
  //       if(response.data.loginfail){
  //         localStorage.removeItem("jwt")
  //       }
  //     }).catch((error)=>{
  //       toast(error.message)
  //     })
  // },[])


  return (
    <div>
      <Header/>
     <Banner/>
     <Aboutus/>
     <Transmissionfilter/>
     <Userfooter/>
    </div>
  )
}

export default UserHome

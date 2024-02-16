import React from 'react'
import './Restarauns.css'
import { Link, useParams } from 'react-router-dom'
import { Restarauns } from './Restarauns';
export const Home = () => {
   const data = useParams()
  return (

  <>   
   <div className='home_wrape'style={{background:'black',height:'100vh'}}>

      <div className="btns_group" style={{display:'flex',flexDirection:"column"}}>
          <Link to={'/login'} className='logogut_btn'>Logout</Link>
          <Link to={`/create/${data.id}`} className='logogut_btn create__btn'>Create</Link>
      </div>

      <Restarauns/>
    </div>
  </>

  )
}

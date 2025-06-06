import React from 'react'
import { Button } from "@/components/ui/button"
import { useDispatch } from 'react-redux'
import { logOutUser } from '@/store/slices/authSlices'

const Home = () => {

  const dispatch = useDispatch()

  const handleLogOut = ()=>{
    dispatch(logOutUser()).then((data)=>{
      console.log(data)
    })
  }



  return (
    <div>
      <Button>
        yellow
      </Button>
      <Button onClick= {handleLogOut}>LogOut</Button>
     

    </div>
  )
}

export default Home
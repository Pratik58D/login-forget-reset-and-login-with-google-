import React from 'react'
 import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({children}) => {
    const {isAuthenticated , isLoading} = useSelector(state => state.auth);
    console.log("from protected Route",isAuthenticated)

    if(isLoading) return <div>Loading.....</div>

    if(!isAuthenticated){
        return <Navigate to = "/login" replace />
    }
  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedRoute
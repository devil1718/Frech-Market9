/* eslint-disable react/prop-types */
import  { useContext } from 'react'
import { userContext } from '../../../context/UserContext/UserContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {
const {userToken}=  useContext(userContext)


  if(userToken || localStorage.getItem('userToken')){
   return  children
  }
  return (
  
   <Navigate to="/login"/>
  )
}

import Navbar from '../Navbar/Navbar'
import {  Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useContext } from 'react'
import { cartContext } from '../../../context/CartContext/CartContext'
import { favoutiteContext } from '../../../context/FavouriteContext/FavouriteContext'
import { userContext } from '../../../context/UserContext/UserContext'
import { useQuery } from 'react-query'



export default function Layout() {

  const { getFav } = useContext(favoutiteContext);
  const  data  =  useQuery('checkFav', getFav);
  const {userToken}= useContext(userContext)
  const {getLogedUserCart}=  useContext(cartContext)

  useEffect (()=>{
     (async ()=>{
    await getLogedUserCart()

    })()

    },[userToken])

  return  <>
    <Navbar/>
    <Outlet/>

    </>

}

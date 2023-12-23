/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import { RouterProvider,   createBrowserRouter,   createHashRouter, } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Home  from "./components/Home/Home"
import Cart  from "./components/Cart/Cart"
import Brands from "./components/Brands/Brands"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Categories from "./components/Categories/Categories"
import Products from "./components/Products/Products"
import Notfound from './components/Notfound/Notfound.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import UserContextprovider from '../context/UserContext/UserContext.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import ProductDetails  from './components/ProductDetails/ProductDetails.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from '../context/CartContext/CartContext.jsx'
import  { Toaster } from 'react-hot-toast';
import SpecificCategory from './components/SpecificCategory/SpecificCategory.jsx'
import SpecificBrands from './components/SpecificBrands/SpecificBrands.jsx'
import WishList from './components/WishList/WishList.jsx'
import FavoutiteContextProvider from '../context/FavouriteContext/FavouriteContext.jsx'
import DetailsUser from './components/DetailsUser/DetailsUser'
import Orders from './components/Orders/Orders.jsx'
import ForgetPassword from './components/ForgetPassword/ForgetPassword.jsx'
import RestCode from './components/RestCode/RestCode.jsx'
import RestPassword from './components/RestPassword/RestPassword.jsx'



    const router =  createHashRouter([
    {path:"",element:<Layout/>,children:[
    {path:"/login" ,element:<Login/>},
    {path:"/forgetpassword" ,element:<ForgetPassword/>},
    {path:"/VerifyResetCode" ,element:<RestCode/>},
    {path:"/resetPassword" ,element:<RestPassword/>},
    {path:"/register" ,element:<Register/>},
    {index:true ,element: <ProtectedRoute> <Home/></ProtectedRoute>},
    {path:"/productDetails/:id" ,element:<ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
    {path:"/cart" ,element:<ProtectedRoute><Cart/> </ProtectedRoute>},
    {path:"/products" ,element: <ProtectedRoute><Products/></ProtectedRoute>},
    {path:"/brands" ,element: <ProtectedRoute><Brands/></ProtectedRoute>},
    {path:"/brands/:brandId" ,element: <ProtectedRoute><SpecificBrands/></ProtectedRoute>},
    {path:"/categories" ,element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:"/categories/:categoryId" ,element:<ProtectedRoute><SpecificCategory/></ProtectedRoute>},
    {path:"/favourite" ,element:<ProtectedRoute><WishList/></ProtectedRoute>},
    {path:"/detailsUser" ,element:<ProtectedRoute><DetailsUser/></ProtectedRoute>},
    {path:"/allorders" ,element:<ProtectedRoute><Orders/></ProtectedRoute>},
    {path:"*" ,element:<ProtectedRoute><Notfound/></ProtectedRoute>},
  ]}
])

const queryClient = new  QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
      <UserContextprovider>

        <CartContextProvider>
      <FavoutiteContextProvider>

         
    <RouterProvider router={router}>
         <App />
      </RouterProvider> 
         <Toaster/>
    
      </FavoutiteContextProvider>
        </CartContextProvider>
        
      </UserContextprovider>

    </QueryClientProvider>
  
)

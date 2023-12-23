import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "../UserContext/UserContext";
import { favoutiteContext } from "../FavouriteContext/FavouriteContext";
import toast from "react-hot-toast";
import { useQuery } from "react-query";


export  const cartContext = createContext()


export default function CartContextProvider({children}) {

  const [numberOfCartItems,setNumberOfCartItems]=useState(0)
  const { isLoading, refetch ,isRefetching } = useQuery('displayCardItems', displayCart);
  

const {userToken} =useContext(userContext)

const headers ={
    token:userToken
}


async function displayCart(){
  try {
    const respone = await getLogedUserCart()
      refetch()
      return respone?.data
  } catch (error) {
    console.log('error',error)   
    toast.error('Failed Process', { duration: 2000, position: 'top-center' });
  }
 
  
  }


async function addProductToCart(id) {
  try {
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId: id },
      { headers }
    );
      setNumberOfCartItems(response.data.numOfCartItems);
      toast.success('Product added successfully', { duration: 1000, position: 'top-center' });
      document.getElementById('cart').classList.add('fa-bounce')
      setTimeout(() => {
        document.getElementById('cart').classList.remove('fa-bounce');
      }, 1000); 
    return response.data;
  }
  
  
  catch (error) {
    toast.error('Failed Process', { duration: 2000, position: 'top-center' });
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: Please login.');
    } else {
      console.error('Error:', error.message);
    }
    return { error: error.message };
  }
}


async function getLogedUserCart(){

  if(!userToken)  return
    try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
        if(response.data.status ==='success'){
          setNumberOfCartItems(response.data.numOfCartItems)
        }
        return response.data
      } catch (error) {
        console.log(error)
        
      } 
    }



async function removeSpacificItemInCart(id){
  try {
    const response = await  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers})
    refetch();
    console.log(response.data.numOfCartItems)
    setNumberOfCartItems(response.data.numOfCartItems);
    toast.success('Successfully Removing item');
 
    
  } catch (error) {
    toast.error('Failed to Remove Item');
    
  }

 }



 async function updateCount(id , count){
   try {
    if (count <= 0) {
      toast('Minimum count of Item is 1', { className: 'bg-danger text-white' });
      return 
      }
  await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count:count},{headers})
  refetch();
} catch (error) {
  toast.error('faild Update Count ')
}

}

async function clearAllItems(){
  try {
    await  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
    await refetch();
    setNumberOfCartItems(0);
    toast.success('Successfully Deleting Cart');

    
  } catch (error) {
    toast.error('Failed Deleting Your Cart');
    
  }
     
    
      
}






  return <cartContext.Provider value={{isRefetching,displayCart, numberOfCartItems , setNumberOfCartItems  , getLogedUserCart, addProductToCart, removeSpacificItemInCart,updateCount,clearAllItems}} >
  {children}
  </cartContext.Provider>
}


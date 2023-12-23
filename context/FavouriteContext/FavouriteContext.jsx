import axios from "axios";
import { useContext, useState } from "react"
import { createContext } from "react";
import { userContext } from "../UserContext/UserContext";
import toast from "react-hot-toast";

export const favoutiteContext= createContext()


export default function FavoutiteContextProvider({children}){
    const [NumberOfFavourite, setNumberOfFavourite] = useState(0)
const {userToken} = useContext(userContext)
const headers={
    token :userToken
}



  async function addtoFavoutite(productId){
    try {
      const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},{headers})
      setNumberOfFavourite(response.data.data.length)
    toast.success('Successfully added to Favorites');
    document.getElementById('bookmark').classList.add('fa-bounce')
    setTimeout(() => {
        document.getElementById('bookmark').classList.remove('fa-bounce');
      }, 1000); 
    } catch (error) {
        toast.error('Failed to add to Favorites');
    }



}



async function getFav(){
    if(!userToken) return
    try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
         setNumberOfFavourite(response.data.count)
        return response.data
    } catch (error) {
        console.log('error',error)      
       
    }



  
}


function removeItemFav(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers})
    .then((res)=>res.data)
    .catch((err)=>err)
}

    return<>
    <favoutiteContext.Provider value={{NumberOfFavourite,addtoFavoutite,getFav,removeItemFav,setNumberOfFavourite}}>
            {children}
    </favoutiteContext.Provider>
    
    </>
}
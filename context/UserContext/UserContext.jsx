import { createContext, useEffect, useState } from "react";

export const userContext = createContext()


export default function UserContextprovider({children}){


const [userToken,setUserToken] = useState(localStorage.getItem('userToken'))
const [userName,setUserName]= useState("")






useEffect(()=>{
    if(localStorage.getItem('userToken')){
        setUserToken(localStorage.getItem('userToken'))
    }
    if(localStorage.getItem('userName')){
        setUserName(localStorage.getItem('userName'))
    }

},[])






return <userContext.Provider value={{userToken,setUserToken,setUserName,userName    }} >
    {children}
</userContext.Provider>

} 
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { useContext } from 'react'
import { cartContext } from '../../../context/CartContext/CartContext'
import { userContext } from '../../../context/UserContext/UserContext'
import  { favoutiteContext } from '../../../context/FavouriteContext/FavouriteContext'




export default function Navbar() {

 const {numberOfCartItems,setNumberOfCartItems}=useContext(cartContext)
 const {NumberOfFavourite,setNumberOfFavourite}= useContext(favoutiteContext)
 const {userToken,userName,setUserToken}= useContext(userContext)

const navigate =useNavigate()

function logOut(){
  setNumberOfCartItems(0)
  setNumberOfFavourite(0)
  setUserToken(null)
  localStorage.clear()
  navigate('/login')
}


const  FColor = Math.trunc(Math.random()*256)
const  SColor = Math.trunc(Math.random()*256)
const  TColor = Math.trunc(Math.random()*256)



  return  <>


   <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      <img src={logo} alt="" />
    </Link>

   

      
  
    <label className="containerr  navbar-toggler d-lg-none "type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" >
  <input type="checkbox"/>
  <div className="checkmark">
    <span></span>
    <span></span>
    <span></span>
  </div>
</label>
   
    



    

    <div className="collapse navbar-collapse" id="collapsibleNavId">
      <ul className="navbar-nav me-auto mt-2 mt-lg-0">
        {userToken? <>
      
        <li className="nav-item">
          <NavLink className="nav-link fw-bolder" to="/products">Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link fw-bolder" to="/categories">Categories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link fw-bolder" to="/allorders">All Orders </NavLink>
        </li>
        
        </>:""}
        
        
      </ul>
      <ul className="navbar-nav ms-auto mt-2 mt-lg-0  d-flex align-items-center" >


  {userToken?<>
            <div className="d-flex   ">

       
          <NavLink className="nav-item position-relative mx-2 p-1    fw-bolder fs-6" to="/favourite">WishLish
          <i  id='bookmark' className="fa-solid fa-bookmark fs-4 ms-1"></i>
          <span className='cartIconNumber position-absolute  text-white'> {NumberOfFavourite}</span>
           </NavLink>
  

  <NavLink to='/cart' className="nav-item position-relative mx-2 p-1   fw-bolder fs-6">Cart
          <i id='cart' className="fa-solid fa-cart-shopping fs-4 ms-1 " ></i>
         <span id='itemsInCard' className={`cartIconNumber position-absolute  text-white`}>{numberOfCartItems}</span>
        </NavLink>
        </div>

      



        <div className="btn-group m-2">
  <button type="button" className="btn  dropdown-toggle d-flex align-items-center justify-content-center" data-bs-toggle="dropdown" aria-expanded="false">
  <li className=''>{userName}</li>
  <li className="dropdown-item rounded-circle mx-2 fw-bolder d-flex align-items-center justify-content-center"style={{width:'40px',height:'40px',backgroundColor:`rgb(${FColor} ,${SColor},${TColor},0.4)`}} >{userName?.slice(0,1).toLocaleUpperCase()}  </li>
  </button>
  <ul className="dropdown-menu dropdown-menu-end">
    <li className="dropdown-item rounded-circle my-2 mx-auto fw-bolder d-flex align-items-center justify-content-center"style={{width:'40px',height:'40px',backgroundColor:`rgb(${FColor} ,${SColor},${TColor},0.4)`}} >{userName?.slice(0,1).toLocaleUpperCase()}  </li>
    <li><button className="dropdown-item  text-center" type="button">{userName}</button></li>
    <hr />
       <li className="nav-item logout text-center">
      <NavLink onClick={()=>{logOut()}} className="nav-link " to='/login'>Logout <i className="fa-solid fa-right-from-bracket"></i></NavLink>
   </li> 
    
  </ul>
</div>




 

  </>  
        
        
        : <>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">Register</NavLink>
        </li>
        </> }

        
        
        
      </ul>
     
    </div>
  </div>
</nav>

    

    </>

}

import { useContext } from 'react'
import './WishList.module.css'
import { favoutiteContext } from '../../../context/FavouriteContext/FavouriteContext'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import Error from '../Error/Error'
import toast from 'react-hot-toast'
import { cartContext } from '../../../context/CartContext/CartContext'
import { Helmet } from 'react-helmet'



export default function WishList() {

const {getFav,removeItemFav,setNumberOfFavourite} = useContext(favoutiteContext)
const {setnumberOfCartItems} =useContext(cartContext)






  






const {data,isLoading,isError,refetch}=useQuery('getWighList',getFav)


async function removeItemWishList(id){
  const response= await removeItemFav(id)
  if(response.status ==='success'){
    
    setNumberOfFavourite(response.data.length)
  
    localStorage.setItem('favNamber',response.data.length)

    refetch()
      toast.success('succefully Deleting')
  }else{
    console.log(response)
    toast.error('faild Deleting')

  }
}
const {addProductToCart}= useContext(cartContext)
async function addtoCart(id){
  const response =  await addProductToCart(id)
  if(response.status ==='success'){
      setnumberOfCartItems(response.numOfCartItems)
  toast.success('Product added successfully',{duration:1000,position:"top-center"})
    console.log('success')
    }else{
    toast.error('Faild Proccess',{duration:2000,position:"top-center"});

    }
  }


  return  <> 
    <Helmet>
    <title>Favourite</title>
  </Helmet>
  <div className="container">
   <div className="bg-main-light p-3 my-5">

      <h2 className='fw-bold py-3'>My Favorites:</h2>
      <h3 className={`h6 fw-bold ${data&& data.count>0 ?"text-main":"text-danger"}` }>total Favourite Items: {data && data.count}</h3>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data && data.data.length > 0 ? (
            data.data.map((fav) => (
              <div className="row bg-4 g-4 my-2 py-2 align-items-center border-bottom" key={fav._id}>
                <div className="col-md-2 col-sm-3">
                  <img className='w-100 rounded-3' src={fav.imageCover} alt="" />
                </div>
                <div className="col-md-10 col-sm-9 d-flex justify-content-between">
                  <div>
                    <h3 className="h6 fw-bolder">
                      {fav.title.split(' ').splice(0, 3).join(' ')}
                    </h3>
                    <h4 className='fw-bold text-main h6'>
                      {fav.price} EGP
                    </h4>
                    <button onClick={()=>{removeItemWishList(fav.id)}} className="btn text-danger font-sm p-0 py-1">
                     
                      <i className='fas fa-trash-can'></i> Remove
                    </button>
                  </div>
                  <div>
                    <button onClick={()=>{addtoCart(fav.id)}} className="btn btn-outline-success px-3 py-2">+ Add To Cart</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2 className='text-center fw-bold' >No Items in Favourite <i className='fas text-danger fa-heart-broken'></i></h2>
          )}
          {isError? <Error /> :""}
        </>
      )}
    </div>
    </div>
  </>

}

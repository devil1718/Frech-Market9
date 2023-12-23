import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import Error from '../Error/Error'
import { useContext } from 'react'
import { cartContext } from '../../../context/CartContext/CartContext'
import Slider from 'react-slick'



export default function ProductDetails() {
  const {id} =useParams()
 

  async function getProductDetails(){
    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((res)=>res)
    .catch((err)=>err)
    return data
    }
    const {data , isLoading , isError}  =  useQuery('ProductDetails',getProductDetails)

    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,

      
    };

    const {addProductToCart} = useContext(cartContext)

    async function addtoCart(id){
      await addProductToCart(id) 
      }

  return  <>
  {isLoading ? <Loading /> :isError ? <Error/> : <>
<div className="container my-5">
  <div className="row py-4 g-4 align-items-center">
    <div className="col-md-3  rounded-5">
    <Slider {...settings}>
      {data?.data.images.map((img ,index)=> <img key={index} src={img} className='w-100 rounded-5' alt={data?.data.title} />)}
    </Slider>
    </div>
    <div className="col-md-9">
    
      <h3 className='fw-bolder h4 mb-3'>{data?.data.title}</h3>
      <p className='lead font-sm'>{data?.data.description}</p>
      <span className='text-main fw-bold'>{data?.data.category.name}</span>
      <div className="d-flex mb-2 justify-content-between">
        <span className='fw-bold'>{data?.data.price} EGP</span>
        <span> <i className='fas fa-star rating-color'></i>{data?.data.ratingsAverage} </span>
      </div>
      <span className={`fw-bold  font-sm ${data?.data.quantity < 10 ? "text-danger" : "text-success"}`} >{data?.data.quantity}  pieces left</span>

      <button onClick={()=>{addtoCart(data &&data.data.id)}} className="w-100 bg-main text-white btn">+ Add to cart </button>
    </div>



  </div>
  </div>
  </>}
  </>

}



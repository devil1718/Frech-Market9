import axios from 'axios'
import './FeaturedProducts.module.css'
import { useQuery } from 'react-query'
import Product from '../Product/Product'
import Loading from '../Loading/Loading'
import Error from '../Error/Error'
import { Helmet } from 'react-helmet'



export default function FeaturedProducts() {
  
  async function getProductsinHomePage(){
     const {data:{data}} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
     .catch((err)=>err)
     return data
     
  }


  const {data,isLoading,isError} = useQuery('ProductsinHomePage',getProductsinHomePage)


  return  <>
    <Helmet>
    <title>All Products</title>
  </Helmet>

   <div className="row g-2 py-4">
  {isLoading ? <Loading /> : isError? <Error/> :  data && data.map((product)=>{return <Product  key={product.id} product={product} />})}
  </div> 
  

  
    </>
}




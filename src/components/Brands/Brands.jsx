
import style from  './Brands.module.css'

import Loading from '../Loading/Loading'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'


export default function Brands() {
 


 async function getBrands(){
  const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)

  return data.data
 } 
 const {data , isError, isLoading}=useQuery('getBrands',getBrands)


  return  <>
    <Helmet>
    <title>Brands</title>
  </Helmet>
 {isLoading ?<Loading/>: data?
 <div className="container">
<div className="row py-5 g-4">
{data?.map((brand)=>{  return <div key={brand._id} className="col-lg-2 col-md-4 col-sm-6 ">
  <Link to={brand._id}>
  <div className={`${style.brandCard} cursor-pointer  text-center border`}>
    <div className="brand-img">
    <img src={brand.image} alt={brand.name} className="w-100" />

    </div>
    <h2 className='h6 fw-bolder border-top py-3'>{brand.name}</h2>
  </div>
  </Link>
</div>
})}


</div>
</div> :""


}
    </>

}

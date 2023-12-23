import style from  './Categories.module.css'
import Loading from '../Loading/Loading'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'


export default function Categories() {

async function getCategories(){
const {data}= await  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
return data.data
}

const {data , isLoading , isError} =  useQuery('getCategories',getCategories)

  return  <>

  <div className="container">
    <div className="row  py-5 g-4">
  {isLoading ?<Loading/>:data &&data.map((category)=>{return <div key={data&&category._id} className="col-lg-3 col-md-4" >
    <Link  to={category._id}>
    <div className={`${style.category} rounded-3 border border-2 text-center overflow-hidden `}>
    <div className="category-img ">
      <img className='w-100' style={{height:'300px',objectFit:'cover',objectPosition:'center'}} src={category.image} alt={category.name} />  
    </div>
    <h3 className="h4 border-top py-3 text-main fw-bolder">
      {category.name}
    </h3>
    </div>
    </Link>
  </div>
  
  
  })


}
</div>
</div>
</>

}

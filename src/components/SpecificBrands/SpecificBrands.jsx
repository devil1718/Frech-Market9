import axios from "axios"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import Loading from "../Loading/Loading"
import Error from '../Error/Error'


export default function getSpecificBrands() {

  const {brandId} = useParams()

async function getSpecificBrands(){
  const {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`).catch((err)=>err)
  return data.data
}
const {data , isError, isLoading}=useQuery('SpecificBrands',getSpecificBrands)
  return  <>
{isLoading ? <Loading/> :data? <div className="container-fluid">
<div className="row g-2  py-5 align-items-center text-center">
  <div className="col-md-6">
   <img  src={data.image} alt={data.name} />
  </div>
  <div className="col-md-6">
    <h2 className="fw-bold ">Brands Name</h2>
    <h2 className="fs-1 fw-bolder text-main">{data.name}</h2>
  </div>
</div>
</div>:"" }
{isError ? <Error/>:''}

    </>

}

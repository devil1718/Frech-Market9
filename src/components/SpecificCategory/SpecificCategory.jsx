import { useParams } from "react-router-dom";
import style from "./SpecificCategory.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

export default function SpecificCategory() {
  const { categoryId } = useParams();

  async function getSpecificCategory() {
    const { data } = await axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`)
      .catch((err) => console.log(err));
    return data.data;
  }

  const { data, isLoading, isError } = useQuery("SpecificCategory", getSpecificCategory);
console.log(data)
  return <>
  <div className="container">
  {isLoading?<Loading/> : data?<div className="row py-5 align-items-center">
  <div className="col-md-6">
    <img style={{height:'500px',objectFit:'cover',objectPosition:'center'}} className="50" src={data.image} alt="" />
  </div>
  <div className="col-md-6 text-center ">
    <h2 className="fw-bolder">Category Name</h2>
    <h1 className="fw-bolder text-main">{data&&data.name} </h1>
  </div>
  </div>:isError?<Error/>:null }
  
  
  
  </div>
  </>;
}

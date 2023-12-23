
import axios from "axios";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'
import Error from "../Error/Error";
import {Pagination} from 'swiper/modules'



export default function CategorySlider() {
  async function getCategorySlider() {
    const { data: { data } } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`); 
    return data;
  }
  const { data,isError } = useQuery('getCategorySlider', getCategorySlider);
  return (
    <>
    {data&& <Swiper

pagination={{ clickable: true ,dynamicBullets:true}}
spaceBetween={30}
slidesPerView={6}
modules={[Pagination]}
breakpoints={{
  320: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  768: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 6,
    spaceBetween: 30,
  },
}}
>
{data &&
  data.map((category) => (
    <SwiperSlide key={category._id}>
      <div className="cursor-pointer" style={{ height: '200px', objectFit: 'cover', objectPosition: 'center' }}>
        <img className="w-100 h-100" src={category.image} alt="" />
        <p className="text-center fw-bolder">{category.name}</p>
      </div>
    </SwiperSlide>
  ))}
  .
</Swiper> }

{isError? <Error/>:null}
     
    </>
  );
}
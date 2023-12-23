import { useFormik } from "formik"
import { useContext, useEffect, useState } from "react"
import { cartContext } from "../../../context/CartContext/CartContext"
import toast from "react-hot-toast"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import * as yup from 'yup'






export default function DetailsUser() {


  const {getLogedUserCart,setNumberOfCartItems}=  useContext(cartContext)


    const [cartId, setcartId] = useState(null)
   const navigate= useNavigate()




  async function getCartId(){
      const data = await getLogedUserCart()
       if(data.status ==='success'){
      setcartId(data?.data?._id)
   }else{
    console.log('faild get cart id ')
   }
  }
  
  useEffect(()=>{
    getCartId()
  },[])

  async function paymentCasheHandler(values){
    try {  
     const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {"shippingAddress":values},{headers:{token:localStorage.getItem('userToken')}})
    .then((res)=>res)
    .catch((err)=>err)

    if(data.status ==='success'){
      setNumberOfCartItems(0)
      toast.success('Succefully Bought')
      
      navigate('/allorders')
    }
     
    } catch (error) {
      console.log('error',error)
    }
  }






 async function paymnetOnlineHandler(values){
  try{
    const {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://moham770.github.io/E-Commerce_Fresh-Market/#`,
    {shippingAddress:values},{headers:{
      token:localStorage.getItem('userToken')
    }})
    setNumberOfCartItems(0)

  window.open(data.session.url,"_self")
  toast.success('Successfully Bought')

  }
 
  catch (error) {
    toast.error('Failed Payment, Please Refresh the Page');

  console.log('error',error)
  }
  
  const navigate = useNavigate()
  async function paymentCasheHandler(values) {
    try {
      const { data } = await cashPayment(cartId, values);
      if (data?.status === 'success') {
        toast.success('Successfully Bought');
        setnumberOfCartItems(0);
        navigate('/allorders');
      } else {
        toast.error('No Products To Buy');
      }
    } catch (error) {
      console.error('An error occurred while making the cash payment request:', error);
      toast.error('An error occurred while processing your payment.');
    }
  }}
 



  const RegexPhone= /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
let validationSchema =  yup.object({
  city:yup.string().required('City Is Required'),
  details:yup.string().max(100,'Max Character is 100 char.').min(5,'Min Character is 5 char.').required('Details is Required.'),
  phone:yup.string().matches(RegexPhone,'Please enter a valid phone number.').required('Phone is Required.'),
})
  
  const formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
  
    },validationSchema
  
    
  })
  
  
  return  <>
          <div className="container my-5">
            <form>

              <label htmlFor="details">Details</label>
              <input className="form-control mb-3" type="text" placeholder="Details" id="details" value={formik.values.details} name="details" onChange={formik.handleChange} onBlur={formik.handleBlur}  />
                {formik.errors.details &&formik.touched.details ? <div className="alert alert-danger p-1">{formik.errors.details}</div>:""}
              
              
              
              <label htmlFor="phone">Phone</label>
              <input className="form-control mb-3" type="tel" placeholder="Phone" id="phone" value={formik.values.phone} name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur}  />
              {formik.errors.phone &&formik.touched.phone ? <div className="alert alert-danger p-1">{formik.errors.phone}</div>:""}




              <label htmlFor="city">City</label>
              <input className="form-control mb-3" type="text" placeholder="City" id="city" value={formik.values.city} name="city" onChange={formik.handleChange} onBlur={formik.handleBlur}  />
              {formik.errors.city &&formik.touched.city ? <div className="alert alert-danger p-1">{formik.errors.city}</div>:""}


              <div className="row ">
          <div className="col-md-6">
          <button disabled={!(formik.isValid&&formik.dirty)} type="button" onClick={()=>{paymnetOnlineHandler(formik.values)}} className="btn bg-main my-2 text-white w-100 fw-bold">Online Payment</button>
          </div>
          <div className="col-md-6">

          <button disabled={!(formik.isValid&&formik.dirty)} type="button"  onClick={()=>{paymentCasheHandler(formik.values)}} className="btn bg-main my-2 text-white w-100 fw-bold">Cash On Deleviry</button>
          </div>
        </div>

            </form>
          </div>



    </>

}

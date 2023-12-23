import {  useFormik } from 'formik'
import './RestPassword.module.css'
import axios from 'axios'
import { useState } from 'react'
import * as yup from'yup'
import { Puff } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'


export default function RestPassword() {

  const [Loading, setLoading] = useState(false)
  const navigate = useNavigate()
  async function handelSubmit(values){
    setLoading(true)
  try {
    const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
    setLoading(false);
    toast.success('Succefully')
    navigate('/login')
  } catch (error) {
    setLoading(false);
    console.error('An error occurred while verifying the reset code:', error);
 
  }
}
const passwordRegex = /^[A-Z]+[A-Za-z0-9!@$%^&]{8,}$/;
const validationSchema= yup.object({
  email:yup.string().email('Please enter a valid email address.').required("Email Is Required"),
  newPassword:yup.string().matches(passwordRegex,
    "Password must start with an uppercase letter and be at least 8 characters, including a combination of letters (uppercase and lowercase), numbers, and the special characters: !, @, $, %, ^, &."
    ).required("Password is Required")
})

 const formik= useFormik({
  initialValues:{
    email:"",
    newPassword: ""
  },
  onSubmit:handelSubmit
  ,validationSchema
 })
  
  
  return  <>

<div className="w-75 mx-auto my-5  bg-main-light p-5 rounded-3 shadow">
  <p className='h6 fw-bold'>Reset Your Password</p>
  
      <form  onSubmit={formik.handleSubmit}>
        <label htmlFor="verifycode">Your Email</label>
        <input name='email' value={formik.values.value} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id='verifycode' placeholder=' Enter Your Email' className='form-control mt-1 mb-2' />
        {formik.errors.email &&formik.touched.email ?   <div className="alert alert-danger p-1">
        {formik.errors.email}</div>:null}
     

    <label htmlFor="newpasswprd">New Password</label>
    <input name='newPassword' value={formik.values.value} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='newpasswprd' className='form-control mt-1' placeholder='New Password...' />
    {formik.errors.newPassword &&formik.touched.newPassword ?<div className="alert alert-danger p-1">
    {formik.errors.newPassword}</div>:null
  }



        <button disabled={!(formik.dirty&&formik.isValid)} type='submit' className='btn bg-main text-white my-3'>
        {Loading ?  <Puff
                  height="35"
                  width="35"
                  radius={1}
                  color="#fff"
                  ariaLabel="puff-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />:"Submit"} 
               
        
         </button>
      </form>
    </div>

    </>

}

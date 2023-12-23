import { useFormik } from 'formik'
import './Register.module.css'
import style from  './Register.module.css'
import axios from 'axios'
import * as yup from 'yup'
import {  useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Puff } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'


export default function Register() {
  const RegexPhone= /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const passwordRegex= /^[A-Z]+[A-Za-z0-9!@$%^&]{8,}$/ 

const navigate =useNavigate()




function toggleShowPassword(e){
    const inputTarget =e.target.parentElement.querySelector('input')
if(inputTarget.getAttribute('type') =='password'){
  inputTarget.setAttribute('type','text')
    e.target.classList.replace("fa-lock",'fa-lock-open')
    e.target.classList.replace('text-danger','text-success')
    
}else{
  inputTarget.setAttribute('type','password')
  e.target.classList.replace('fa-lock-open',"fa-lock")
  e.target.classList.replace('text-success','text-danger')

}

}
  const [isError, setisError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


async function registerSubmit(values){
  setIsLoading(true)
 const  {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
.catch((err)=> {
  setisError(err.response.data.message)
  setIsLoading(false)
})
if(data.message =="success")
setIsLoading(false)
navigate('/login')

}


  let validationSchema =  yup.object({
    name:yup.string().max(10,'Please enter a name with no more than 10 characters').min(3,'Please enter a name with at least 3 characters.').required('name is Required'),
    email:yup.string().email('Please enter a valid email address.').required('Email Is Required'),
    phone:yup.string().matches(RegexPhone,'Please enter a valid phone number.').required('Phone is Required'),
    password:yup.string().matches(passwordRegex,'Password must start with an uppercase letter and be at least 8 characters, including a combination of letters (uppercase and lowercase), numbers, and the special characters: !, @, $, %, ^, &.').required('Password is Required'),
    rePassword:yup.string().oneOf([yup.ref('password')],'Passwords do not match. Please make sure your passwords are identical.').required('RePassword is Required')
  })

const formik =useFormik({
  initialValues:{
    name:"",
    email:"",
    phone:"",
    password:"",
    rePassword:""
  },
  onSubmit:registerSubmit,
  validationSchema

})



return  <>
<Helmet>
  <title>Register</title>
</Helmet>
  <div className="w-75 mx-auto py-4">
    <h2>Register Now: </h2>
    <form onSubmit={formik.handleSubmit}>
    {isError ? <div className='alert alert-danger p-3 mt-3'>{isError} </div>:""}


    <label htmlFor="name">Name:</label>
    <input type="text" placeholder='Name'  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}  name='name'  id='name' className='form-control mt-1 mb-2'/>
    {formik.errors.name &&formik.touched.name ? <div className='alert alert-danger p-2'>{formik.errors.name}</div>:null}




    <label htmlFor="email">Email:</label>
    <input type="email" placeholder='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name='email'  id='email' className='form-control mt-1 mb-2'/>
    {formik.errors.email &&formik.touched.email ? <div className='alert alert-danger p-2'>{formik.errors.email}</div>:null}




    <label htmlFor="phone">Phone:</label>
    <input type="tel" placeholder='Phone'  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} name='phone' id='phone' className='form-control mt-1 mb-2'/>
    {formik.errors.phone &&formik.touched.phone ? <div className='alert alert-danger p-2'>{formik.errors.phone}</div>:null}






    <label htmlFor="password">Password:</label>
    <div className="iconToShowPassword position-relative ">
    <input type="password" placeholder='Password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}  name='password' id='password' className='form-control mt-1 mb-2'/>
    <i onClick={(e)=>{toggleShowPassword(e)}}  className={`${style.showPassword}  text-danger fas fa-lock position-absolute end-0 top-50 translate-middle-y`}></i>
    </div>
    {formik.errors.password &&formik.touched.password ? <div className='alert alert-danger p-2'>{formik.errors.password}</div>:null}



    <label htmlFor="rePassword">RePassword:</label>
    <div className="iconToShowPassword position-relative ">
    <input type="password" placeholder='RePassword'  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} name='rePassword' id='rePassword' className='form-control mt-1 mb-2'/>
    <i  onClick={(e)=>{toggleShowPassword(e)}} className={`${style.showPassword} text-danger fas fa-lock position-absolute end-0 top-50 translate-middle-y`}></i>
    </div>
    {formik.errors.rePassword &&formik.touched.rePassword ? <div className='alert alert-danger p-2'>{formik.errors.rePassword}</div>:null}






    <button disabled={!(formik.dirty &&formik.isValid)} type='submit' className="bg-main btn text-white mt-3">{isLoading ? <>
    <Puff
  height="35"
  width="35"
  radius={1}
  color="#4fa94d"
  ariaLabel="puff-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/> </> :"Register"} </button>



    </form>
  </div>
    </>

}

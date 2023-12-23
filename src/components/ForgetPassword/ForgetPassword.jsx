import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {   ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { Puff } from 'react-loader-spinner';

export default function ForgetPassword() {
  const navigate = useNavigate();

  const   [Loading, setIsLoading] = useState(false)

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  });



  async function handelForgetPaswordFunction (values){
    setIsLoading(true)
    try {

  await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        values
      );
        navigate('/VerifyResetCode');
        setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      console.error('Error:', error);
    } 
  };



const formik = useFormik({
  initialValues:{
    email: '',
  },
  onSubmit:handelForgetPaswordFunction,
  validationSchema,

})


  return (
    <>
      <div className="mx-auto my-5 w-75 bg-main-light p-5 rounded-3 shadow">
      
 
            <form onSubmit={formik.handleSubmit}>
              <h3>Forgot password</h3>
              <label htmlFor="email">Email</label>
              <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}  id="email" name="email" placeholder="Enter Your Email" className="form-control mt-1" />
              {formik.errors.email &&formik.touched.email ?<p className='m-2 text-red'>{formik.errors.email}</p>:null}
         
              <p style={{ fontSize: '15px' }} className="lead text-muted mt-2">
                We’ll send a verification code to this email
              </p>
              <button disabled={!(formik.isValid)}  type='submit' className='btn bg-main text-white my-3'>
             {Loading ? <Puff
                  height="30"
                  width="30"
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
  );
}

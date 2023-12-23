import { useState } from 'react'
import './RestCode.module.css'
import axios from 'axios'
import { Puff } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'



export default function RestCode() {

  const [Loading, setLoading] = useState(false)
  const navigate= useNavigate()

  // async function verifyResetCode(){
  //   const verifycode = document.getElementById('verifycode')
  // try {
  //   setLoading(true)
  //     return await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{
  //       resetCode: verifycode.value
  //     })
  //     .then((res)=>{
  //       navigate('/resetPassword')
  //       console.log('sadasd')
  //       setLoading(false)
  //       console.log(res)
  //       return res
  //     })
  //     .catch((err)=>{
  //       setLoading(false)

  //       err
  //     })


  // } catch (error) {
  //   console.log('error',error)
    
  // }



  // }

  async function verifyResetCode() {
    const verifycode = document.getElementById('verifycode');
    try {
      setLoading(true);
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        {
          resetCode: verifycode.value,
        }
      );
      navigate('/resetPassword');
      setLoading(false);
      console.log(response);
      return response;
    } catch (error) {
      setLoading(false);
      console.error('An error occurred while verifying the reset code:', error);
   
    }
  }
  
  return  <>



<div className=" my-5 w-75 mx-auto bg-main-light p-5 rounded-3 shadow">
      <form>
        <label htmlFor="verifycode">Verify Reset Code</label>
        <input type="text" id='verifycode' placeholder='verify code ..' className='form-control mt-1' />
        <button onClick={()=>{verifyResetCode()}} type='button' className='btn bg-main text-white my-3'>
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

import './Footer.module.css'
import Amazon_Pay from '../../assets/images/Amazon_Pay-Logo.wine.png'
import American from '../../assets/images/American-Express-Logo-PNG-Image.png'
import MasterCard from '../../assets/images/MasterCard_Logo.svg.webp'
import paypal from '../../assets/images/paypal-logo.png'
import appStore from '../../assets/images/appstore.png'
import googlePlay from '../../assets/images/googleplay.png'
export default function Footer() {
  return  <>

    <footer >
      <div className="bg-main-light  py-3 px-5  ">
    <h5 className='fw-bold'>Get The Fresh Cart App </h5>
    <h6>we will send you a  link, open it on your phone to download the app </h6>
    <div className="row g-3  py-1 border-bottom ">
      <div className="col-md-9">
        <input type="text" className='form-control w-75' placeholder='Email...'  /> 
      </div>
      <div className="col-md-3">
        <button className="w-100 btn text-light bg-main ">
          Share App Link
        </button>
      </div>
     
      </div>
      <div className="row  g-md-2 border-bottom  ">
        <div className="col-md-6 d-flex align-items-center">
          <div className="row  g-2 mt-1 w-100 align-items-center">
            <div className="col-lg-4">
        <p className='m-0 fw-bold'>Payment Partner</p>

            </div>
            <div className="col-lg-8">
                <img  className='mx-2' style={{width:'50px ',objectFit:"cover",objectPosition:"center"}} src={Amazon_Pay} alt="Amazon_Pay" />          
            <img  className='mx-2' style={{width:'50px ',objectFit:"cover",objectPosition:"center"}} src={American} alt="American" />  
            <img className='mx-2' style={{width:'50px ',objectFit:"cover",objectPosition:"center"}}  src={MasterCard} alt="MasterCard" />          
            <img  className='mx-2' style={{width:'50px ',objectFit:"cover",objectPosition:"center"}} src={paypal} alt="paypal" />  
            </div>
          </div>
          
        </div>
        <div className="col-md-6 d-flex justify-content-end  align-items-center">
          <div className="row  w-100 g-1 align-items-center">
            <div className="col-lg-4">

          <p className='m-0 fw-bold'>Get Delevires With Fresh Cart</p>
            </div>
            <div className="col-lg-8">
                      <img  className='mx-2' src={googlePlay} style={{width:'100px',objectFit:"cover",objectPosition:"center"}} alt="" />  
            <img className='mx-2'  src={appStore} style={{width:'100px',objectFit:"cover",objectPosition:"center"}} alt="" /> 
            </div>

          </div>
               
        </div>
      </div>
    


    
    


</div>

    </footer>  

    </>

}

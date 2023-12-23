
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { cartContext } from '../../../context/CartContext/CartContext';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import { Link } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';

export default function Cart() {
  const {isRefetching,displayCart,numberOfCartItems, setNumberOfCartItems, getLogedUserCart, removeSpacificItemInCart, updateCount, clearAllItems } = useContext(cartContext);



  const { data, isError ,isLoading } = useQuery('displayCardItems', displayCart);




  return (
    
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="container">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error />
        ) : (
          <>
            {data && data.products.length > 0 ? (
              <div className="p-4 my-5 bg-main-light">
                <h2 className="fw-bold">Shop Cart: </h2>
                <div className=" my-3">
                  <h4 className="h5 fw-bold">Total Cart Price: <span className="text-main h5 fw-bolder">{data.totalCartPrice} EGP</span></h4>
                  <h6 className="h5 fw-bold">Total cart items: <span className="text-main h5 fw-bolder">{data.products.length}</span></h6>
                </div>
                {data.products.map((item) => (
                  <div key={item.product.id} className="row mb-3 g-4">
                    <div className="col-md-1">
                      <img className="w-100" src={item.product.imageCover} alt={item.product.title.split(' ').slice(0, 3).join(' ')} />
                    </div>
                    <div className="col-md-11">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <h2 className="h5 fw-bold">{item.product.title.split(' ').slice(0, 3).join(' ')}</h2>
                          <h6 className="fw-bolder font-sm text-main">Price: {item.price} EGP</h6>
                          <button onClick={() =>  removeSpacificItemInCart(item.product.id)} className="btn"><i className="fas fa-trash-can text-danger"></i> Remove</button>
                        </div>
                        <div className="d-flex align-items-center">
                          <button disabled={isRefetching}  onClick={() => updateCount(item.product.id, item.count + 1)} style={{width:'27px',height:'27px',backgroundColor:'var(--main-color)'}} className="d-flex border-0 justify-content-center align-items-center btn btn-success rounded-circle  mx-1"> +</button>
                          <span className="mx-1">{item.count}</span>
                          <button disabled={isRefetching} onClick={() => updateCount(item.product.id, item.count - 1)} style={{width:'27px',height:'27px',backgroundColor:'#e00'}} className="d-flex border-0  justify-content-center align-items-center btn btn-success rounded-circle  mx-1">-</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="row g-1">
                  <div className="col">
                    <Link to="/detailsUser" className="btn text-bg-primary  text-white w-100 fw-bold">CHECK OUT</Link>
                  </div>
                  <div className="col">
                <button onClick={clearAllItems} className="btn  w-100 text-white"  style={{backgroundColor:'#e00'}}>CLEAR CART</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 my-5 bg-main-light">
                <h2 className="fw-bold">Shop Cart</h2>
                <h4 className="text-main font-sm fw-bold mb-3">Total Cart Price: 0 EGP</h4>
                <h2 className="text-danger fw-bolder text-center">No items in the cart <i className="fas fa-sad-cry"></i></h2>
              </div>
            )}
          </>
        )}
      </div>
    </>


  );
}

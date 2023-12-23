import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { cartContext } from '../../../context/CartContext/CartContext';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import { Puff } from 'react-loader-spinner';

export default function Orders() {
  const { isRefetching, displayCart, numberOfCartItems, setNumberOfCartItems, removeSpacificItemInCart } = useContext(cartContext);

  const { data, isError, isLoading } = useQuery('displayCardItems', displayCart);

  // Function to clear items in the row div
  const handleClearHistory = () => {
    const rowItems = document.querySelectorAll('.row-item'); // Replace with the actual class you use for the row div

    if (rowItems.length > 0) {
      rowItems.forEach((rowItem) => {
        while (rowItem.firstChild) {
          rowItem.removeChild(rowItem.firstChild);
        }
      });
      toast.success('All items in the row cleared successfully');
    } else {
      toast.error('No items in the row found');
    }
  };

  return (
    <>
      <Helmet>
        <title>Order History</title>
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
                <h2 className="fw-bold">History: </h2>
                <div className=" my-3">
                  {/* <h6 className="h5 fw-bold">History Orders : <span className="text-main h5 fw-bolder">{data.products.length}</span></h6> */}
                </div>
                {data.products.map((item, index) => (
                  <div key={item.product.id} className="row mb-3 g-4 row-item">
                    <div className="col-md-1">
                      <img className="w-100" src={item.product.imageCover} alt={item.product.title.split(' ').slice(0, 3).join(' ')} />
                    </div>
                    <div className="col-md-11">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <h2 className="h5 fw-bold">{item.product.title.split(' ').slice(0, 3).join(' ')}</h2>
                          <h6 className="fw-bolder font-sm text-main">Price: {item.price} EGP</h6>
                          {/* <button onClick={() => removeSpacificItemInCart(item.product.id)} className="btn"><i className="fas fa-trash-can text-danger"></i> Remove</button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="row g-1">
                  <div className="col">
                    <button onClick={handleClearHistory} className="btn w-100 text-white" style={{ backgroundColor: '#e00' }}>
                      CLEAR History
                    </button>
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

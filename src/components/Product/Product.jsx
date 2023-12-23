  import { Link } from 'react-router-dom';
  import { useContext, useRef } from 'react';
  import { cartContext } from '../../../context/CartContext/CartContext';
  import { favoutiteContext } from '../../../context/FavouriteContext/FavouriteContext';
  import { useQuery } from 'react-query';

  export default function Product({ product }) {
    const { getFav } = useContext(favoutiteContext);
    const {data}  = useQuery('checkFav', getFav);
    const {getLogedUserCart}= useContext(cartContext)
  const respoonse = useQuery('checkCart',getLogedUserCart)




    const  iconFav= useRef()
    const  iconcart= useRef()
    const { imageCover, category: { name }, title, price, ratingsAverage, id } = product;
    const { addProductToCart } = useContext(cartContext);
    const { addtoFavoutite } = useContext(favoutiteContext);

    async function addtoCart(id) {
      await addProductToCart(id);
      iconcart.current.classList.add('bg-main','text-white')

    
    }

    async function addToWishList(id) {
        await addtoFavoutite(id)
        iconFav.current.classList.add('text-red')
    }


    const isFavorite = data && data.data.some((fav) => fav.id === id);
    const heartIconClass = isFavorite ? ' text-red' : null;



    const isInCart = respoonse && respoonse?.data?.data.products.some((prod) => prod.product.id === id);
    const cartIconClass = isInCart ? ' bg-main text-white' : null;

    return (
      <>
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
          <div className="item  product cursor-pointer p-2 rounded-2">
            <Link to={`/productDetails/${id}`}>
              <img className="w-100" src={imageCover} alt="" />
              <p className="font-sm text-main fw-bold m-0">{name}</p>
              <p className="fw-bold">{title.split(' ').splice(0, 2).join(' ')}</p>
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-bold">{price} EGP</span>
                <span>
                  <i className="fas fa-star rating-color"></i>
                  {ratingsAverage}
                </span>
              </div>
            </Link>  


          <div className="cart ">
            <i ref={iconcart} onClick={()=> addtoCart(id)} className={`fa-solid fa-cart-shopping    font-sm ${cartIconClass}` } >  </i>
            <p className='m-0 cart-text'  > +Add To Cart</p>
          </div> 
                    {/* <i ref={iconcart} onClick={()=> addtoCart(id)} className={`fa-solid fa-cart-shopping cart text-white me-2 font-sm ${cartIconClass}` } >  </i> */}




              <i ref={iconFav}  onClick={() => addToWishList(id)} className={`fas fa-heart fa-2x ms-auto heart  ${heartIconClass}`}></i>
      
          </div>
        </div>
      </>
    );
  }

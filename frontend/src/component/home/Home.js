import React, { Fragment, useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import './Home.css';
import Product from './product.js';
import MetaData from '../layout/MetaData';
import { fetchProducts,clearErrors } from '../../Slices/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';
import { Link } from 'react-scroll';

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(fetchProducts({}));
  }, [dispatch, error, alert]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Home Page" />
          <div className="banner">
            <div className="flex flex-col items-center mt-[40px]">
              <p className="font-bold lg:text-4xl text-xl my-1">WE ARE</p>
              <h1 className="font-bold lg:text-8xl text-4xl lg:my-[20px] my-1">
                LAZY CART
              </h1>
              <p className="mt-[20px] lg:my-[20px] lg:text-2xl w-50% text-sm my-2">
                Unleash your shopping desires with our exceptional products and
                unbeatable deals, making every purchase a memorable experience.
              </p>

              <Link to="container" smooth={true} duration={500}>
                <button className="startShoppingBtn">
                  Start Shopping <CgMouse />
                </button>
              </Link>
            </div>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Home;

import React, { Fragment, useEffect, useState } from 'react';
import './ProductPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts,clearErrors } from '../../Slices/productSlice';
import Loader from '../layout/loader/Loader';
import ProductCard from '../home/product';
import MetaData from '../layout/MetaData';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useAlert } from 'react-alert';

const categories = [
  'laptop',
  'Footwear',
  'Bottom',
  'Tops',
  'Attire',
  'Camera',
  'SmartPhones',
  'shirt',
];

const ProductPage = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,

    // filteredProductsCount,
  } = useSelector((state) => state.products);

  const params = useParams();
  const keyword = params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(fetchProducts({keyword, currentPage, price, category, ratings}));
  }, [dispatch, keyword, currentPage, price, category, ratings, error, alert]);

  // let count = filteredProductsCount
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- LazyCart" />
          <h2 className="productsHeading">
            {keyword ? `Results for “${keyword}”` : 'All Products'}
          </h2>
          <p className="productsSubtitle">
            {productsCount
              ? `Showing ${products?.length || 0} of ${productsCount} products`
              : 'Discover our curated collection'}
          </p>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          {keyword && (
            <div className="filterBox  left-4 w-[150px] mb-5 h-[400px]">
              <Typography className="flex justify-center items-center">
                Price
              </Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
                className="w-[200px]"
              />
              <Typography className="flex justify-center items-center mb-5 ">
                Categories
              </Typography>
              <ul className="categoryBox flex flex-col justify-center items-center">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <fieldset className="flex mb-5">
                <Typography
                  component="legend"
                  className="flex justify-center items-center"
                >
                  Ratings
                </Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                  className="w-[500px]"
                />
              </fieldset>
            </div>
          )}

          {resultPerPage < productsCount && (
            <div className="pagination mb-4">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductPage;

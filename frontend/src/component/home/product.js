import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const product = ({ product }) => {
  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    size: window.innerWidth < 600 ? 15 : 22,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Link className="home-product-card" to={`/product/${product._id}`}>
      <div className="home-product-imgwrap">
        <img src={product.images[0].url} alt={product.name} />
      </div>

      <div className="home-product-body">
        <h3 className="home-product-name">{product.name}</h3>
        <p className="home-product-desc">{product.description}</p>

        {product.category && (
          <span className="home-product-category">{product.category}</span>
        )}

        <div className="home-product-rating">
          <ReactStars {...options} />
          <span>({product.numOfReviews} Reviews)</span>
        </div>

        <div className="home-product-price">{`₹${product.price}`}</div>
      </div>
    </Link>
  );
};

export default product;

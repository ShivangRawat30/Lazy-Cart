import React, { Fragment } from 'react';
import './Cart.css';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeCartItem } from '../../Slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart({ id, quantity: newQty }));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart({ id, quantity: newQty }));
  };

  const deleteCartItems = (id) => {
    dispatch(removeCartItem(id));
  };

  const checkoutHandler = () => {
    navigate(`/login?redirect=shipping`);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <p>Your cart is empty</p>
          <span className="emptyCartSub">
            Looks like you haven't added anything yet.
          </span>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <div className="cartPage">
          <h1 className="cartHeading">Your Cart</h1>

          <div className="cartLayout">
            <div className="cartItems">
              {cartItems.map((item) => (
                <div className="cartItemRow" key={item.product}>
                  <Link
                    to={`/product/${item.product}`}
                    className="cartItemImg"
                  >
                    <img src={item.image} alt={item.name} />
                  </Link>

                  <div className="cartItemInfo">
                    <Link
                      to={`/product/${item.product}`}
                      className="cartItemName"
                    >
                      {item.name}
                    </Link>
                    <span className="cartItemUnit">₹{item.price} each</span>
                    <button
                      className="cartItemRemove"
                      onClick={() => deleteCartItems(item.product)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="cartStepper">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      −
                    </button>
                    <span className="cartQty">{item.quantity}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className="cartItemSubtotal">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <aside className="cartSummary">
              <h2>Order Summary</h2>
              <div className="cartSummaryRow">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>
              <div className="cartSummaryRow">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="cartSummaryRow muted">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="cartSummaryTotal">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>
              <button className="cartCheckoutBtn" onClick={checkoutHandler}>
                Proceed to Checkout
              </button>
              <Link to="/products" className="cartContinue">
                Continue Shopping
              </Link>
            </aside>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Cart;

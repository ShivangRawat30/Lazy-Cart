import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import orderReducer from './Slices/orderSlice'; // Import your orderSlice
import productReducer from './Slices/productSlice'; // Import your productSlice
import userReducer from './Slices/userSlice'; // Import your userSlice
import cartReducer from './Slices/cartSlice'; // Import your cartSlice

// Create a root reducer by combining the reducers from your slices
const rootReducer = {
  order: orderReducer,
  products: productReducer,
  user: userReducer,
  cart: cartReducer,
};

// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

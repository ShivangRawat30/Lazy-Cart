import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
} from "../constants/productContants";
export const productReducer =
  ((state = { products: [] }),
  (action) => {
    switch (action.type) {
      case ALL_PRODUCT_REQUEST:
        return {
          loading: true,
          product: [],
        };
      case ALL_PRODUCT_SUCCESS:
        return {
          loading: false,
          product: action.payload.products,
          productsCount: action.payload.products.productsCount,
        };
      case ALL_PRODUCT_FAIL:
        return {
          loading: false,
          error: action.payload,
        };

      default:
        return state;
    }
  });

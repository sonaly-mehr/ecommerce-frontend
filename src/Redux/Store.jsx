import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./Reducers/CartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./Reducers/OrdeReducer";
import {
  newProductReducer,
  newReviewReducer,
  ProductDetailsReducer,
  productReducer,
  ProductReducer,
  productReviewsReducer,
  reviewReducer,
} from "./Reducers/ProductReducer";
import { allUsersReducer, profileReducer, userDetailsReducer, userReducer } from "./Reducers/UserReducer";

let Cart = cartReducer;
let initialState = {
  Cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const store = configureStore({
  reducer: {
    Products: ProductReducer,
    ProductDetail: ProductDetailsReducer,
    Users: userReducer,
    Profile: profileReducer,
    Cart,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer
  },
  initialState,
});

export default store;

import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Header from "./Components/Layout/Header/Header";
import { useEffect, useState } from "react";
import WebFont from "webfontloader";
import Home from "./Components/Home/Home";
import ProductDetail from "./Components/Product/ProductDetail";
import Product from "./Components/Product/Product";
import Search from "./Components/Product/Search";
import LoginSignup from "./Components/User/LoginSignup";
import Profile from "./Components/User/Profile";
import UserOptions from "./Components/Layout/Header/UserOptions";
import { useSelector } from "react-redux";
import UpdateProfile from "./Components/User/UpdateProfile";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import UpdatePassword from "./Components/User/UpdatePassword";
import Cart from "./Components/Cart/Cart";
import Shipping from "./Components/Cart/Shipping";
import ConfirmOrder from "./Components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./Components/Cart/Payment";
import store from "./Redux/Store.jsx";
import { loadUser, login } from "./Redux/Actions/UserAction";
import Banner from "./Components/Home/Banner";
import MyOrder from "./Components/Order/MyOrder";
import OrderDetail from "./Components/Order/OrderDetail";
import OrderSuccess from "./Components/Cart/OrderSuccess";
import Footer from "./Components/Layout/Footer/Footer";
import Dashboard from "./Components/Admin/Dashboard";
import ProductList from "./Components/Admin/ProductList";
import NewProduct from "./Components/Admin/NewProduct";
import OrderList from "./Components/Admin/OrderList";
import ProcessOrder from "./Components/Admin/ProcessOrder";
import UserList from "./Components/Admin/UserList";
import UpdateUser from "./Components/Admin/UpdateUser";
import ProductReviews from "./Components/Admin/ProductReviews";
import UpdateProduct from "./Components/Admin/UpdateProduct";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.Users);
  // const [stripeApiKey, setStripeApiKey] = useState("");
  const stripePromise = loadStripe('pk_test_51IeF2FDWdYPFaGFdcB4l7ZnOYxuVEToaYpUgLehHupf7KUBNSlAzbuCd7Y3oaObJaE1QlOGwDS55LrNZeU2gsgW3008PyxC6sG');
  // async function getStripeApiKey() {
  //   const { data } = await axios.get("http://localhost:4000/api/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    // getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
      <Route
      path="/process/payment"
      element={(<Elements stripe={stripePromise}><Payment/></Elements>)}
    />
      {/* stripe={loadStripe(stripeApiKey) */}
        <Route exact path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Product />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/products/:keyword" element={<Product />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignup />} />
        {isAuthenticated && <Route path='/user/profile' element={<Profile/>} />}
        <Route path="/profile/update" element={<UpdateProfile />} />
        <Route path="/password/update" element={<UpdatePassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/order" element={<MyOrder />} />
        <Route path="/order/:id" element={<OrderDetail />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
        {isAuthenticated && <Route path="/admin/dashboard" element={<Dashboard />} />}
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/product" element={<NewProduct />} />
        <Route path="/admin/product/:id" element={<UpdateProduct />} />
        <Route path="/admin/orders" element={<OrderList />} />
        <Route path="/admin/order/:id" element={<ProcessOrder />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/user/:id" element={<UpdateUser />} />
        <Route path="/admin/reviews" element={<ProductReviews />} />
        {/* <Route path="/admin/product/:id" element={<NewProduct />} /> */}
        {/* <Route path="/admin/orders" element={<Dashboard />} /> */}
        {/* <Route path="/admin/users" element={<Dashboard />} />
        <Route path="/admin/reviews" element={<Dashboard />} /> */}
        {/* <Route path="/user/profile" element={<ProtectedRoute component={}/>} /> */}
        {/* <Route path="/user/profile/update" element={<UserDashboard />} />
          <Route path="/user/order-history" element={<OrderHistory />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

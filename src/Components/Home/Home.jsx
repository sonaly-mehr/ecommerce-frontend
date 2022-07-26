import { Box, CircularProgress, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/Actions/ProductAction";
import Footer from "../Layout/Footer/Footer";
import Banner from "./Banner";
import "./Home.css";
import NewsLetter from "./NewsLetter";
import ProductCard from "./ProductCard";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.Products);
  console.log("products", products)
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent:'center', marginTop:'20%'}}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
          <Grid container spacing={4}>
            {
              products.products && products.products.map((product) => (
                <ProductCard key={product._id} product={product}></ProductCard>
              ))
            }
            </Grid>
          </div>

          <Banner/>
          <NewsLetter/>
        </>
      )}
    </>
  );
};

export default Home;

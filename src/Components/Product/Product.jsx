import { Box, CircularProgress, Grid, Slider, Typography } from "@mui/material";
import { Rating } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../../Redux/Actions/ProductAction";
import cardImg from "../../images/cover.jfif";
import "../Home/Home.css";
import Pagination from "react-js-pagination";
import "./Product.css";
import ProductCard from "../Home/ProductCard";

const categories = [
  "Laptop",
  "Footwear",
  "Headset",
  "Tops",
  "Sunglass",
  "Camera",
  "SmartPhones",
  "Watch"
];

const Product = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 2000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    // filteredProductsCount
  } = useSelector((state) => state.Products);

  console.log("All products", products)
  const keyword = params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  }

  useEffect(() => {
    if(error){
      alert(error)
    }
    dispatch(getProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, error]);

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop:'20%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <div
          className="container"
          id="container"
          style={{ marginTop: "60px", marginBottom: "60px", width: "75%" }}
        >
          <Grid container spacing={4}>
            {products.products&& products.products.map((product) => (
                <ProductCard key={product._id} product={product}></ProductCard>
              ))}
              {products.products && products.products.length===0 && <h3 style={{marginLeft:'43%', marginTop:'15%', fontSize:'22px', fontFamily:'Chilanka'}}>No Prdoucts Found!</h3>}
          </Grid>
        </div>
      )}

      <div className="filterBox">
        <Typography>Price</Typography>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={2000}
          style={{width:'80%', height:'3px'}}
        />

        <Typography>Categories</Typography>
            <ul className="categoryBox">
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

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
      </div>

      {resultPerPage <= productsCount && (
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage.resultPerPage}
            totalItemsCount={productsCount.productsCount}
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
    </>
  );
};

export default Product;

import React from "react";
import cardImg from "../../images/cover.jfif";
import { Rating } from "@mui/lab";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

const ProductCard = (props) => {
  const{name, price, numOfReviews, ratings, _id, images} = props.product
  const options = {
    value: ratings,
    readOnly: true,
    precision: 0.5,
    size:'small'
  };
  return (
      <Grid item xs={12} md={3}>
        <Link className="productCard" to={`/product/${_id}`}>
          {images ? <img src={images[0].url} alt="" /> : <img src={cardImg} alt="" /> }
    
          <p>{name}</p>
          <div>
            <Rating {...options} />{" "}
            <span className="productCardSpan"> ({numOfReviews} Reviews)</span>
          </div>
          <span>${price}</span>
        </Link>
      </Grid>
  );
};

export default ProductCard;

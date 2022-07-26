import { Delete, Star } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './ProductReviews.css'
import Sidebar from './Sidebar';
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { deleteReviews, getAllReviews } from '../../Redux/Actions/ProductAction';
import { DELETE_REVIEW_RESET } from '../../Redux/Constants/ProductConstants';

const ProductReviews = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [productId, setProductId] = useState("");

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert(error);
    }
    if (deleteError) {
      alert(deleteError);
    }
    if (isDeleted) {
      alert("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, navigate, isDeleted, productId]);


    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "user",
          headerName: "User",
          minWidth: 200,
          flex: 0.6,
        },
    
        {
          field: "comment",
          headerName: "Comment",
          minWidth: 350,
          flex: 1,
        },
    
        {
          field: "rating",
          headerName: "Rating",
          type: "number",
          minWidth: 180,
          flex: 0.4,
    
          cellClassName: (params) => {
            return params.getValue(params.id, "rating") >= 3
              ? "greenColor"
              : "redColor";
          },
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Button
                  onClick={() =>
                    deleteReviewHandler(params.getValue(params.id, "id"))
                  }
                >
                  <Delete />
                </Button>
              </>
            );
          },
        },
      ];
    
      const rows = [];
    
      reviews &&
        reviews.forEach((item) => {
          rows.push({
            id: item._id,
            rating: item.rating,
            comment: item.comment,
            user: item.name,
          });
        });

    return (
        <>
        <div className="dashboard">
          <Sidebar />
          <div className="productReviewsContainer">
            <form
              className="productReviewsForm"
              onSubmit={productReviewsSubmitHandler}
            >
              <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
  
              <div>
                <Star />
                <input
                  type="text"
                  placeholder="Product Id"
                  required
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>
  
              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  loading ? true : false || productId === "" ? true : false
                }
              >
                Search
              </Button>
            </form>
  
            {reviews && reviews.length > 0 ? (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            ) : (
              <h1 className="productReviewsFormHeading">No Reviews Found</h1>
            )}
          </div>
        </div>
      </>
    );
};

export default ProductReviews;
import { Rating } from "@mui/lab";
import React from 'react';
import Carousel from "react-material-ui-carousel";
import userProfile from '../../images/user-profile-icon-free-vector.webp';

const ReviewCard = ({review}) => {
    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
      };

    return (
        <div className="reviewCard">
      <img src={userProfile} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
    );
};

export default ReviewCard;
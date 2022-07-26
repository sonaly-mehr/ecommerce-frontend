import { CheckCircle } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './OrderSuccess.css'

const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
      <CheckCircle />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/order">View Orders</Link>
    </div>
    );
};

export default OrderSuccess;
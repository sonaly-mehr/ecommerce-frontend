import React, { useEffect } from 'react';
import "./ProductList.css";
import Sidebar from './Sidebar';
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, getAllOrders } from '../../Redux/Actions/OrderAction';
import { DELETE_ORDER_RESET } from '../../Redux/Constants/OrderConstants';

const OrderList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { error, orders } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
      };

      useEffect(() => {
        if (error) {
          alert(error);
        }
    
        if (deleteError) {
          alert(deleteError);
        }
    
        if (isDeleted) {
          alert("Order Deleted Successfully");
          navigate("/admin/orders");
          dispatch({ type: DELETE_ORDER_RESET });
        }
    
        dispatch(getAllOrders());
      }, [dispatch, error, deleteError, navigate, isDeleted]);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 150,
          flex: 0.5,
          cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 150,
          flex: 0.4,
        },
    
        {
          field: "amount",
          headerName: "Amount",
          type: "number",
          minWidth: 270,
          flex: 0.5,
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
                <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                  <Edit />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteOrderHandler(params.getValue(params.id, "id"))
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
    
      orders &&
        orders.forEach((item) => {
          rows.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus,
          });
        });

    return (
        <>
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
    );
};

export default OrderList;
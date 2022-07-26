import { Link } from 'react-router-dom';
import { Add, Dashboard, ExpandMore, ImportExport, ListAlt, People, PostAdd, RateReview } from '@mui/icons-material';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import React from 'react';
import logo from '../../images/logo.png'
import './Sidebar.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
      <Link to="/home">
        <img src={logo} alt="Ecommerce" />
      </Link>
      <Link to="/admin/dashboard" style={{cursor:'pointer'}}>
        <p>
          <Dashboard /> Dashboard
        </p>
      </Link>
      <Link to="">
        <TreeView
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ImportExport />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAdd />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<Add />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAlt />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <People /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReview />
          Reviews
        </p>
      </Link>
    </div>
    );
};

export default Sidebar;
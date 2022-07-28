import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import profileImg from '../../images/Profile_img.png'
import './Profile.css'

const Profile = () => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.Users);
    const navigate = useNavigate()
    useEffect(()=> {
        if(!isAuthenticated){
            navigate('/login')
        }
    }, [navigate, isAuthenticated])
    return (
        <>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent:'center', marginTop:'20%'}}>
          <CircularProgress />
        </Box>
        ) : (
          <>
            <div className="profileContainer">
              <div>
                <h1>My Profile</h1>
                <img src={profileImg} alt={user.name} />
                <Link to="/profile/update">Edit Profile</Link>
              </div>
              <div>
                <div>
                  <h4>Full Name</h4>
                  <p>{user.name}</p>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h4>Joined On</h4>
                  <p>{String(user.createdAt).substr(0, 10)}</p>
                </div>
  
                <div>
                  <Link to="/order">My Orders</Link>
                  <Link to="/password/update">Change Password</Link>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
};

export default Profile;

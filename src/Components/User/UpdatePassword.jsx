import { Lock, LockOpen, VpnKey } from '@mui/icons-material';
import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../../Redux/Actions/UserAction';
import { UPDATE_PASSWORD_RESET } from '../../Redux/Constants/UserConstants';
import './UpdatePassword.css'

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { error, isUpdated, loading } = useSelector((state) => state.Profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    // const myForm = new FormData();

    // myForm.set("oldPassword", oldPassword);
    // myForm.set("newPassword", newPassword);
    // myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(oldPassword, newPassword, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }

    if (isUpdated) {
      alert("Profile Updated Successfully");

      navigate("/user/profile");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated]);
    return (
        <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent:'center', marginTop:'20%'}}>
        <CircularProgress />
      </Box>
      ) : (
        <>
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKey />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <Lock />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
    );
};

export default UpdatePassword;
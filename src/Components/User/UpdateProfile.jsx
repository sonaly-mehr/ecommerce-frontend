import { Face, MailOutline } from "@mui/icons-material";
import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from 'react-router-dom';
import './UpdateProfile.css'
import { UPDATE_PROFILE_RESET } from "../../Redux/Constants/UserConstants";
import { loadUser, updateProfile } from "../../Redux/Actions/UserAction";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.Users);
  console.log("user", user)
  const { error, isUpdated, loading } = useSelector((state) => state.Profile);
  console.log("updated", isUpdated)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    // const myForm = new FormData();

    // myForm.set("name", name);
    // myForm.set("email", email);
    dispatch(updateProfile(name, email));
  };

  console.log(updateProfileSubmit)

  useEffect(() => {
    if(user) {
      setName(user.name);
      setEmail(user.email);
    }

    if (error) {
      alert(error);
    }

    if (isUpdated) {
      alert("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/user/profile");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, user, isUpdated, navigate]);
  console.log(user)


  return ( <>
    {loading ? (
      <Box sx={{ display: "flex", justifyContent:'center', marginTop:'20%'}}>
      <CircularProgress />
    </Box>
    ) : (
      <>
        <div className="updateProfileContainer">
          <div className="updateProfileBox">
            <h2 className="updateProfileHeading">Update Profile</h2>

            <form
              className="updateProfileForm"
              onSubmit={updateProfileSubmit}
            >
              <div className="updateProfileName">
                <Face />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="updateProfileEmail">
                <MailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Update"
                className="updateProfileBtn"
              />
            </form>
          </div>
        </div>
      </>
    )}
  </> );
};

export default UpdateProfile;

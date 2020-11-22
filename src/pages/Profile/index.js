import React from "react";
import "./Profile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Typography, Button } from "@material-ui/core";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

library.add(faEdit);

function EditProfile() {
  return (
    <div className="profile-container">
      <div className="profile-avatar">
        <Grid container spacing={2}>
          <Grid item lg={4} md={6} xs={12} >
            <div>
              <img src="images/male.png" style={{ width: "100%" }} />
            </div>
          </Grid>
          <Grid item lg={8} md={6} xs={12} >
            <div className="profile-avatar-content">
              <Typography variant="h1" style={{ color: "#fb5b5a" }}>
                John Cena
              </Typography>
              <Typography variant="h5" style={{ color: "#465881" }}>
                johncena1323@gmail.com
              </Typography>
              <button className="profile-edit">
                Edit Information
                 <FontAwesomeIcon icon="edit" style={{ marginLeft: "10px" }} />
              </button>
            </div>
          </Grid>
        </Grid>
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default EditProfile;

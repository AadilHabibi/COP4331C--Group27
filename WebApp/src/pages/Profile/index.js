import React, { useState } from "react";
import "./Profile.scss";
import { Grid, Typography, Button } from "@material-ui/core";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit,faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MovieIcon from '@material-ui/icons/Movie';
import MovieAvatar from "./MovieAvatar";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import { toUpper } from "lodash";
import { useHistory,Redirect } from "react-router-dom";
library.add(faEdit,faVideo);

function EditProfile() {
  const [movies, setMovies] = useState({});
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const history = useHistory();
  const loadMovies = () => {
    AuthService.getName()
      .then((user) => {
        console.log(user);
        setName(user.name);
      })
      .catch((err) => console.log(err));
    UserService.getMovies()
      .then((res) => {
        setMovies(res);
        //
        let userData = AuthService.getLoggedInUser();
        if (userData) {
          setUser(userData);
        }
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(loadMovies, []);
  if (!AuthService.isLoggedIn()) return <Redirect to="/login" />;
  return (
    <div className="profile-container">
      <div className="profile-avatar">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ background: "#fb5b5a", boxSizing: "border-box" }}
          spacing={2}
        >
          <Grid item lg={6} md={6} xs={12}>
            <img
              src={`images/${user.gender ? user.gender : "dummy"}.png`}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <div className="profile-avatar-content">
              <Typography variant="h4" style={{ color: "#003f5c" }}>
                {toUpper(name)}
              </Typography>
              <Typography variant="h5" style={{ color: "#465881" }}>
                {user.email}
              </Typography>
              <button
                className="profile-edit"
                onClick={() => history.push("/edit")}
              >
                Edit Information
                <FontAwesomeIcon icon="edit" style={{ marginLeft: "10px" }} />
              </button>
              <button
                className="profile-edit"
                onClick={() => history.push("/movies")}
              >
                Movies
                <FontAwesomeIcon icon="video" style={{ marginLeft: "10px" }} />
              </button>

            </div>
          </Grid>
        </Grid>
      </div>
      <Grid
        style={{ width: "80vw" }}
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        {movies.likes?.map((id) => (
          <Grid item key={id} xs={12} lg={12} md={8} sm={10} xl={10}>
            <MovieAvatar
              imdbID={id}
              status={"like"}
              updateMovies={(movies) => setMovies(movies)}
            />
          </Grid>
        ))}
        {movies.dislikes?.map((id) => (
          <Grid item key={id} xs={12} lg={12} md={8} sm={10} xl={10}>
            <MovieAvatar
              imdbID={id}
              status={"dislike"}
              updateMovies={(movies) => setMovies(movies)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default EditProfile;

import {
  Grid,
  Paper,
  Popover,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import "./Movies.scss";
import MovieService from "../../services/MovieService";
import AuthService from "../../services/AuthService";
import MovieCard from "./MovieCard";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSignOutAlt,
  faTrash,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, Redirect } from "react-router-dom";
library.add(faTrash, faSignOutAlt, faUserCircle);

function Movies() {
  const [name, setName] = useState("");
  const [movies, setMovies] = useState([]);
  const history = useHistory();
  if (!AuthService.isLoggedIn()) return <Redirect to="/login" />;
  return (
    <div className="movie-container">
      <div
        style={{ display: "flex", width: "95%", justifyContent: "flex-end" }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              margin: "10px",
            }}
          >
            <FontAwesomeIcon
              icon="user-circle"
              style={{ color: "#fb5b5a", fontSize: "50px" }}
              onClick={() => history.push("/profile")}
            />
            <Typography style={{ color: "#fb5b5a", margin: "5px" }}>
              Profile
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              margin: "10px",
            }}
          >
            <FontAwesomeIcon
              icon="sign-out-alt"
              style={{ color: "#fb5b5a", fontSize: "50px" }}
              onClick={() => {
                AuthService.logout();
                history.push("/login");
              }}
            />
            <Typography style={{ color: "#fb5b5a", margin: "5px" }}>
              Logout
            </Typography>
          </div>
        </div>
      </div>
      <Typography style={{ color: "#fb5b5a", margin: "20px" }} variant="h2">
        FlickPick
      </Typography>

      <Paper className="movie-search" elevation={15}>
        <input
          type="search"
          placeholder="Search movies here.."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              MovieService.search(name)
                .then((data) => {
                  console.log(data);
                  setMovies(data);
                })
                .catch((err) => console.log(err));
            }
          }}
          onChange={(e) => {
            setName(e.target.value);
            console.log(e.target.value);
          }}
        ></input>
      </Paper>

      <div className="movie-result">
        <Grid
          container
          spacing={1}
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          {movies?.map((movie) => (
            <Grid item xl={12} sm={4} lg={3} xl={2}>
              <MovieCard {...movie} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Movies;

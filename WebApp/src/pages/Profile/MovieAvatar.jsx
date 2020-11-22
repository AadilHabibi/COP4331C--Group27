import React, { useState } from "react";
import "./MovieAvatar.scss";
import MovieService from "../../services/MovieService";
import UserService from "../../services/UserService";
import { Delete } from "@material-ui/icons";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import { Typography } from "@material-ui/core";
function MovieAvatar({ imdbID, status,updateMovies }) {
  const [data, setData] = useState({});
  const loadData = () => {
    console.log(imdbID);
    MovieService.movieByID(imdbID).then((data) => setData(data));
  };

  const handleDelete = () =>
    UserService.deleteMovie(imdbID)
      .then((res) => {
        console.log(res);
        updateMovies(res)
      })
      .catch((err) => console.log(err));

  React.useEffect(loadData, []);
  return (
    <div className="movie-avatar-conatiner">
      <div className="movie-avatar-image">
        <img style={{ height: "75px",width:"50px" }} src={data?.Poster} />
      </div>
      <div className="movie-avatar-detail">
  <Typography variant="h6">{data?.Title}</Typography>
      </div>
      {status === "like" ? <ThumbUpAltIcon /> : <ThumbDownAltIcon />}
      <div className="movie-avatar-icon" onClick={handleDelete}>
        <Delete />
      </div>
    </div>
  );
}

export default MovieAvatar;

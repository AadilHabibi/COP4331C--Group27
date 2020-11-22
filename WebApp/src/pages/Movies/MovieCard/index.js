import React from "react";
import "./MovieCard.scss";
import {
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import CloseIcon from "@material-ui/icons/Close";
import MovieService from "../../../services/MovieService";
import UserService from "../../../services/UserService";
function MovieCard({ Poster, Title, Year, imdbID, close }) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const [likeStatus, setLikeStatus] = React.useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLike = () => {
    UserService.likeMovie(imdbID)
      .then((res) => {
        console.log(res);
        if (res === 1) {
          setLikeStatus("Added to liked movies.");
        } else if (res === 2) {
          setLikeStatus("Already liked!");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDislike = () => {
    UserService.dislikeMovie(imdbID)
      .then((res) => {
        if (res === 1) {
          setLikeStatus("Added to disliked movies.");
        } else if (res === 2) {
          setLikeStatus("Already disliked!");
        }
      })
      .catch((err) => console.log(err));
  };

  const loadData = () => {
    MovieService.movieByID(imdbID)
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(loadData, []);
  return (
    <div className="movie-card-container">
      <img src={Poster} onClick={handleClickOpen} />
      <Typography style={{ color: "#fb5b5a" }} variant="h6">
        {Title}
      </Typography>
      <Typography style={{ color: "#fb5b5a" }} variant="h6">
        {Year}
      </Typography>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogActions>
          <IconButton onClick={handleClose} color="primary">
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogTitle id="responsive-dialog-title">{Title}</DialogTitle>
        <DialogContent>
          <DialogContentText>Genre: {data?.Genre}</DialogContentText>
          <DialogContentText>Director: {data?.Director}</DialogContentText>
          <DialogContentText>Language: {data?.Language}</DialogContentText>
          <DialogContentText>Country: {data?.Country}</DialogContentText>
          <DialogContentText>Awards: {data?.Awards}</DialogContentText>
          <DialogContentText>IMDB Rating: {data?.imdbRating}</DialogContentText>
          <Rating name="read-only" max={10} value={data?.imdbRating} readOnly />
          <DialogContentText>{likeStatus}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton autoFocus onClick={handleLike} color="primary">
            <ThumbUpIcon />
          </IconButton>
          <IconButton onClick={handleDislike} color="primary" autoFocus>
            <ThumbDownIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MovieCard;

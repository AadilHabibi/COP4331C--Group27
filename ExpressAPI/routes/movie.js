const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { auth } = require("../middlewares/user");
const _ = require("lodash");

router.get("/likes-dislikes", auth, (req, res) => {
  console.log(req.user);
  const user_id = req.user._id;
  const User = mongoose.model("User");
  User.findById(user_id)
    .then((user) => {
      let likes = [...user.likes];
      let dislikes = [...user.dislikes];
      let data = {
        likes: likes,
        dislikes: dislikes,
      };
      return res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send("User Not Found");
    });
});
router.post("/like-movie", auth, (req, res) => {
  console.log(req.user);
  const user_id = req.user._id;
  const User = mongoose.model("User");
  const imdbID = req.body.imdbID;

  User.findById(user_id)
    .then((user) => {
      let likes = [];
      let dislikes = [];
      likes = [...user.likes];
      dislikes = [...user.dislikes];
      //Remove from dislikes
      dislikes = dislikes.filter((id) => id !== imdbID);
      //Add to likes
      if (!likes.includes(imdbID)) {
        likes.push(imdbID);
        //Save updated data
        User.updateOne(
          { _id: user_id },
          {
            $set: { likes: likes, dislikes: dislikes },
          }
        )
          .then((response) => {
            console.log(response);
            return res.status(200).send({status:1});
          })
          .catch((err) => {
            console.log(err);
            return res.status(400).send("Internal server error!");
          });
        //
      } else {
        return res.status(200).send({status:2});
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send("User Not Found");
    });
});
router.post("/dislike-movie", auth, (req, res) => {
  console.log(req.user);
  const user_id = req.user._id;
  const User = mongoose.model("User");
  const imdbID = req.body.imdbID;
  User.findById(user_id)
    .then((user) => {
      let likes = [];
      let dislikes = [];
      likes = [...user.likes];
      dislikes = [...user.dislikes];
      //Remove from likes
      likes = likes.filter((id) => id !== imdbID);
      //Add to dislikes
      if (!dislikes.includes(imdbID)) {
        dislikes.push(imdbID);
        //Save updated data
        User.updateOne(
          { _id: user_id },
          {
            $set: { likes: likes, dislikes: dislikes },
          }
        )
          .then((response) => {
            console.log(response);
            return res.status(200).send({status:1});
          })
          .catch((err) => {
            console.log(err);
            return res.status(400).send("Internal server error!");
          });
        //
      } else {
        return res.status(200).send({status:2});
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send("User Not Found");
    });
});
router.delete("/delete-movie", auth, (req, res) => {
  const user_id = req.user._id;
  const User = mongoose.model("User");
  console.log(req.body)
  const imdbID = req.body.imdbID;
  if(!imdbID) return res.status(400).send("Invalid ID")
  User.findById(user_id)
    .then((user) => {
      let likes = [];
      let dislikes = [];
      likes = [...user.likes];
      dislikes = [...user.dislikes];
      //Remove id from likes and dislikes
      likes = likes.filter((id) => id !== imdbID);
      dislikes = dislikes.filter((id) => id !== imdbID);
      //Save updated data
      User.updateOne(
        { _id: user_id },
        {
          $set: { likes: likes, dislikes: dislikes },
        }
      )
        .then((response) => {
          return res.status(200).send({ likes: likes, dislikes: dislikes });
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).send("Internal server error!");
        });
      //
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send("User Not Found");
    });
});

module.exports = router;

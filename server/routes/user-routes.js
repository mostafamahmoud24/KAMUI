const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/user-model");

//GET all users
router.get("/", (req, res, err) => {
  User.find()
    .exec()
    .then((users) => {
      res.status(200).json({
        message: "Get all users",
        count: users.length,
        users: users,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//GET user by Id
router.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .exec()
    .then((user) => {
      res.status(200).json({
        message: "User with Id: " + req.params.id,
        user: user,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "No user found with Id: " + req.params.id,
      });
    });
});

//PATCH the user's anime list by Id
router.patch("/animeList/:id", (req, res, next) => {
  const id = req.params.id;
  User.updateOne({ _id: id }, { anime_list_id: req.body.animeList })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//PATCH the user's watched anime by Id
router.patch("/animeWatched/:id", (req, res, next) => {
  const id = req.params.id;
  User.updateOne({ _id: id }, { anime_watched_id: req.body.animeWatched })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//PATCH the user's liked anime by Id
router.patch("/animeLiked/:id", (req, res, next) => {
  const id = req.params.id;
  User.updateOne({ _id: id }, { anime_liked_id: req.body.animeLiked })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//PATCH the user's manga list by Id
router.patch("/mangaList/:id", (req, res, next) => {
  const id = req.params.id;
  User.updateOne({ _id: id }, { manga_list_id: req.body.mangaList })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//PATCH the user's read manga by Id
router.patch("/mangaWatched/:id", (req, res, next) => {
  const id = req.params.id;
  User.updateOne({ _id: id }, { manga_watched_id: req.body.mangaWatched })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//PATCH the user's liked manga by Id
router.patch("/mangaLiked/:id", (req, res, next) => {
  const id = req.params.id;
  User.updateOne({ _id: id }, { manga_liked_id: req.body.mangaLiked })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;

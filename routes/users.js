const express = require("express");

const {
  createUser,
  getUsers,
  getUser,
  login,
  photoUpload,
} = require("../controllers/users");

const router = express.Router();
const pagination = require("../middleware/pagination");
const { protect } = require("../middleware/auth");
const cache = require("../middleware/cache");
const User = require("../model/User");

router.route("/").post(createUser);

router.get("/", cache(20), pagination(User), getUsers);

router.route("/:id").get(getUser);

router.route("/login").post(login);

router.route("/photo/:id").post(photoUpload);

module.exports = router;

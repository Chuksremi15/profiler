const express = require("express");

// Mounting twig
const { TwingEnvironment, TwingLoaderFilesystem } = require("twing");
let loader = new TwingLoaderFilesystem("./templates");
let twing = new TwingEnvironment(loader);

// const {
//   createUser,
//   getUsers,
//   getUser,
//   login,
//   photoUpload,
// } = require("../controllers/users");

const User = require("../model/User");
const crypto = require("crypto");
const { sign } = require("jsonwebtoken");

const router = express.Router();

router.route("/").get(async (req, res) => {
  const data = await User.findAll();

  data.password = undefined;

  twing.render("users.twig", { data }).then((output) => {
    res.end(output);
  });
});

router.route("/users/:id").get(async (req, res) => {
  const id = req.params.id;
  let user = await User.findOne({
    where: { id: `${id}` },
  });

  user.password = undefined;

  user = user.dataValues;

  twing.render("user.twig", { user }).then((output) => {
    res.end(output);
  });
});

router.route("/register").get(async (req, res) => {
  twing.render("register.twig", {}).then((output) => {
    res.end(output);
  });
});

router.route("/register").post(async (req, res) => {
  let photo_url = req.body.photo_url;
  let { firstname, lastname, email, password } = req.body;

  photo_url = "";

  const useremail = await User.findOne({
    where: { email: `${email}` },
  });

  let newmail = useremail.email;

  if (newmail) {
    twing.render("register.twig", { newmail }).then((output) => {
      res.end(output);
    });
  }

  newmail = undefined;

  // Hash password with HMACSHA256
  password = crypto.createHash("sha256").update(password).digest("hex");

  const data = await User.create({
    firstname,
    lastname,
    email,
    password,
    photo_url,
  });

  // Create json web token: Expires in an hour
  const jsontoken = sign({ id: data.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.redirect("/");
});

module.exports = router;

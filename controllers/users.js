const User = require("../model/User");
const crypto = require("crypto");
const { sign } = require("jsonwebtoken");

//@desc     Create new user
//@route    POST /api/users
//@access   Public
exports.createUser = async (req, res) => {
  try {
    let { firstname, lastname, email, password, photo_url } = req.body;

    const useremail = await User.findOne({
      where: { email: `${email}` },
    });

    console.log(useremail);

    if (useremail) {
      return res.status(401).json({
        success: false,
        message: "User already exist",
      });
    }

    // Hash password with HMACSHA256
    password = crypto.createHash("sha256").update(password).digest("hex");

    const data = await User.create({
      firstname,
      lastname,
      email,
      password,
      photo_url,
    });

    data.password = undefined;

    // Create json web token: Expires in an hour
    const jsontoken = sign({ id: data.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      success: true,
      data: data,
      token: jsontoken,
    });
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(500).res.json({
        error: err,
        message: "Internal server error",
      });
    }
  }
};

//@desc     Get all users
//@route    GET /api/users
//@access   Public
exports.getUsers = async (req, res) => {
  try {
    res.status(200).json(res.advancedResults);
    // const data = await User.findAll();

    // data.forEach(($data) => ($data.password = undefined));

    // return res.status(200).json({
    //   success: true,
    //   data: data,
    // });
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(500).res.json({
        error: err,
        message: "Internal server error",
      });
    }
  }
};

//@desc     Get single user by id
//@route    GET /api/users/:id
//@access   Public
exports.getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await User.findOne({
      where: { id: `${id}` },
    });

    data.password = undefined;

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(500).res.json({
        error: err,
        message: "Internal server error",
      });
    }
  }
};

//@desc     Login User
//@route    POST /api/users/login
//@access   Public
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    const data = await User.findOne({
      where: { email: `${email}` },
    });

    if (!data) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentails",
      });
    }

    // Hash password with HMACSHA256
    password = crypto.createHash("sha256").update(password).digest("hex");

    //confirm password
    if (!(password === data.password)) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentails",
      });
    }

    data.password = undefined;

    // Create json web token: Expires in an hour
    const jsontoken = sign({ id: data.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      success: true,
      message: "login successfully",
      user: data,
      token: jsontoken,
    });
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(500).res.json({
        error: err,
        message: "Internal server error",
      });
    }
  }
};

//@desc     Login User
//@route    POST /api/users/photo/:id
//@access   Public
exports.photoUpload = async (req, res) => {
  console.log(req.files);

  if (!req.files) {
    return res.status(400).json({
      message: "please upload a file 1",
    });
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return res.status(400).json({
      message: "please upload a file",
    });
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return res.status(400).json({
      message: `Please upload an image file less than ${process.env.MAX_FILE_UPLOAD}`,
    });
  }

  //Create custom filename
  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: `problem with file upload`,
      });
    }

    res.status(200).json({
      success: true,
      data: { fileName: file.name, filePath: `/uploads/${file.name}` },
    });
  });

  const photourl = file.name;
  const id = req.params.id;

  try {
    const user = await User.findOne({
      where: { id: `${id}` },
    });

    user.password = undefined;

    if (!user) {
      return res.json({
        success: 0,
        message: "Record not found",
      });
    }

    user.photo_url = `${photourl}`;
    user.save();
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(500).res.json({
        error: err,
        message: "Internal server error",
      });
      return;
    }
  }
};

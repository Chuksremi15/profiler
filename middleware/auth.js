const jwt = require("jsonwebtoken");

//Protect routes
exports.protect = async (req, res, next) => {
  let token = req.header("x-auth-token");

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];
  // } else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exist
  if (!token) {
    return res.json({
      status: 401,
      error: "Not authorize to access this route",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    req.user = await User.findOne({
      where: { id: `${decoded.id}` },
    });

    next();
  } catch (err) {
    return res.json({
      status: 401,
      error: "Not authorize to access this route",
    });
  }
};

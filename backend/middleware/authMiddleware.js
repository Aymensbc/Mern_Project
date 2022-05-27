const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get Token from header
      token = req.headers.authorization.split(" ")[1];

      //Verify Token it taken in the token itself and the secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get User from the token and assign it to req.user so we can access req.user in any route that is protcted
      //password meansthat it will ot include the password
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  //If there is no token
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized , no Token ");
  }
});

module.exports = { protect };

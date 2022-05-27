const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); //to hash our passwords
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Register a User
// @route   POST api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400); //400 is a bad request
    throw new Error("Please add all fields");
  }

  //Check if user exists
  const userExists = await User.findOne({ email }); //findOne needs an object
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10); // we need to generate salt to hash the password
  const hashedPassword = await bcrypt.hash(password, salt); //we use salt to hash the password

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201); // OK and also something was created!
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

// @desc    Authenticate/login a User
// @route   POST api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  //

  res.json({ message: "Login User" });
});

// @desc    Get User data
// @route   GET api/users/me
// @access  Private
//Get me is a protected route where we are using custom midleware protect. So we can access user id from req.user since we had put user in req.user
const getMe = asyncHandler(async (req, res) => {
  const { name, email, _id } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// Generate JWT token
//we are putting id in the payload.jwt.sign is gonna use the following arguments:
//1. id or whatever payload we are sending
//2. the secret key
//3. OPtions : expires in
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
module.exports = { registerUser, loginUser, getMe };

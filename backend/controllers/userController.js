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
      name: user.email,
      email: user.email,
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
  res.json({ message: "Login User" });
});

// @desc    Get User data
// @route   GET api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "get User" });
});

module.exports = { registerUser, loginUser, getMe };

const mongoos = require("mongoose");

// @desc    Register a User
// @route   POST api/users
// @access  Public
const registerUser = (req, res) => {
  res.json({ message: "register User" });
};

// @desc    Authenticate/login a User
// @route   POST api/users/login
// @access  Public
const loginUser = (req, res) => {
  res.json({ message: "Login User" });
};

// @desc    Get User data
// @route   GET api/users/me
// @access  Private
const getMe = (req, res) => {
  res.json({ message: "get User" });
};

module.exports = { registerUser, loginUser, getMe };

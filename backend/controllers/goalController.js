//---WHY USE EXPRESS ASYNC HANDLER : When we use Mongoose to connect with the database , these functions return a promise
//So we have to add async await in a try catch block. In order to avoid the try catch block, we can use the express-async-handler: npm i express-async-handler
const asyncHandler = require("express-async-handler");
// @desc    Get goals
// @route   GET api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "GET GOALS" });
});

// @desc    Set goals
// @route   POST api/goals
// @access  Private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please enter text msg");
  }
  res.status(200).json({ message: "CREATE GOALS" });
});

// @desc    Update goals
// @route   PUT api/goals
// @access  Private
const updateGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `UPDATE GOAL  ${req.params.id}` });
});

// @desc    delete goals
// @route   DELETE api/goals
// @access  Private
const deleteGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `DELETE GOALS ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};

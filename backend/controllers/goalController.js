//---WHY USE EXPRESS ASYNC HANDLER : When we use Mongoose to connect with the database , these functions return a promise
//So we have to add async await in a try catch block. In order to avoid the try catch block, we can use the express-async-handler: npm i express-async-handler
const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
// @desc    Get goals
// @route   GET api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

// @desc    Set goals
// @route   POST api/goals
// @access  Private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please enter text msg");
  }
  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(200).json(goal);
});

// @desc    Update goals
// @route   PUT api/goals
// @access  Private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new error("Goal not found");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// @desc    delete goals
// @route   DELETE api/goals
// @access  Private
const deleteGoals = asyncHandler(async (req, res) => {
  const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedGoal);
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};

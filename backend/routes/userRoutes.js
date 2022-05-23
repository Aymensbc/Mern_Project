const express = require("express");
const router = express.Router();

const {
  loginUser,
  registerUser,
  getMe,
} = require("../controllers/userController");

router.post("/", registerUser);
router.get("/me", getMe);
router.post("/login", loginUser);

module.exports = router;

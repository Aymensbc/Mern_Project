const express = require("express");
const router = express.Router();

const {
  loginUser,
  registerUser,
  getMe,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.get("/me", protect, getMe);
router.post("/login", loginUser);

module.exports = router;

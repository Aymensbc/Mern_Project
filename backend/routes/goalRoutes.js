const express = require("express");
const router = express.Router();
const {
  getGoals,
  deleteGoals,
  setGoals,
  updateGoals,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");

// router.get("/", getGoals);
// router.post("/", setGoals);
//Instead of above we can write in the following way :
router.route("/").get(protect, getGoals).post(protect, setGoals);

// router.put("/:id", updateGoals);
// router.delete("/:id", deleteGoals);
router.route("/:id").put(protect, updateGoals).delete(protect, deleteGoals);

module.exports = router;

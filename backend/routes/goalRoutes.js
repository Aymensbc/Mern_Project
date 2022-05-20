const express = require("express");
const router = express.Router();
const {
  getGoals,
  deleteGoals,
  setGoals,
  updateGoals,
} = require("../controllers/goalController");

// router.get("/", getGoals);
// router.post("/", setGoals);
//Instead of above we can write in the following way :
router.route("/").get(getGoals).post(setGoals);

// router.put("/:id", updateGoals);
// router.delete("/:id", deleteGoals);
router.route("/:id").put(updateGoals).delete(deleteGoals);

module.exports = router;

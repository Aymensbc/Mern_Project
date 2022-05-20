const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "GET GOALS" });
});

router.post("/", (req, res) => {
  res.status(200).json({ message: "CREATE GOALS" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: `UPDATE GOAL  ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: `DELETE GOALS ${req.params.id}` });
});
module.exports = router;

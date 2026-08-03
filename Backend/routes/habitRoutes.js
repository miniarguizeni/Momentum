const express = require("express");

const router = express.Router();

const {
  createHabit,
  getHabits,
  getHabitById,
  updateHabit,
  deleteHabit,
} = require("../controllers/habitController");

const { protect } = require("../middleware/authMiddleware");

router.route("/")
  .post(protect, createHabit)
  .get(protect, getHabits);

router.route("/:id")
  .get(protect, getHabitById)
  .put(protect, updateHabit)
  .delete(protect, deleteHabit);

module.exports = router;
const Habit = require("../models/Habit");

// ==========================
// Create Habit
// ==========================
const createHabit = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      frequency,
      goal,
      color,
      icon,
    } = req.body;

    const habit = await Habit.create({
      title,
      description,
      category,
      frequency,
      goal,
      color,
      icon,
      user: req.user._id,
    });

    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get all habits
// ==========================
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({
      user: req.user._id,
    });

    res.json(habits);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get one habit
// ==========================
const getHabitById = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    res.json(habit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Update Habit
// ==========================
const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    Object.assign(habit, req.body);

    const updatedHabit = await habit.save();

    res.json(updatedHabit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Delete Habit
// ==========================
const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await habit.deleteOne();

    res.json({
      message: "Habit deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createHabit,
  getHabits,
  getHabitById,
  updateHabit,
  deleteHabit,
};
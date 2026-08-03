import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHabit } from "../services/habitService";
import { useAuth } from "../context/AuthContext";

function AddHabit() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [habit, setHabit] = useState({
    title: "",
    description: "",
    category: "",
    frequency: "Daily",
    goal: 30,
    color: "#7C5CFC",
    icon: "⭐",
  });

  const handleChange = (e) => {
    setHabit({
      ...habit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createHabit(habit, user.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Couldn't create habit.");
    }
  };

  return (
  <div className="page">
    <div className="form-card">

      <h1>🌙 Create a New Habit</h1>

      <p className="form-subtitle">
        Every great achievement starts with one small habit.
      </p>

      <form onSubmit={handleSubmit}>

        <label>Habit Name</label>
        <input
          name="title"
          placeholder="Ex: Drink Water"
          value={habit.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Describe your habit..."
          value={habit.description}
          onChange={handleChange}
        />

        <label>Category</label>
        <input
          name="category"
          placeholder="Health, Study, Fitness..."
          value={habit.category}
          onChange={handleChange}
        />

        <label>Frequency</label>
        <select
          name="frequency"
          value={habit.frequency}
          onChange={handleChange}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>

        <label>Goal (Days)</label>
        <input
          type="number"
          name="goal"
          value={habit.goal}
          onChange={handleChange}
        />

        <label>Choose a Color</label>
        <input
          type="color"
          name="color"
          value={habit.color}
          onChange={handleChange}
        />

        <label>Emoji</label>
        <input
          name="icon"
          value={habit.icon}
          onChange={handleChange}
        />

        <div className="form-buttons">

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-btn"
          >
            Save Habit
          </button>

        </div>

      </form>

    </div>
  </div>
);
}

export default AddHabit;
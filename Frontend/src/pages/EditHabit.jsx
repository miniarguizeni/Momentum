import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHabits, updateHabit } from "../services/habitService";
import { useAuth } from "../context/AuthContext";

function EditHabit() {
  const { id } = useParams();
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

  useEffect(() => {
    loadHabit();
  }, []);

  const loadHabit = async () => {
    try {
      const habits = await getHabits(user.token);

      const selected = habits.find((h) => h._id === id);

      if (selected) {
        setHabit(selected);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setHabit({
      ...habit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateHabit(id, habit, user.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Couldn't update habit.");
    }
  };

  return (
    <div className="page">
      <div className="form-card">

        <h1>✏ Edit Habit</h1>

        <form onSubmit={handleSubmit}>

          <input
            name="title"
            value={habit.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            value={habit.description}
            onChange={handleChange}
          />

          <input
            name="category"
            value={habit.category}
            onChange={handleChange}
          />

          <select
            name="frequency"
            value={habit.frequency}
            onChange={handleChange}
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>

          <input
            type="number"
            name="goal"
            value={habit.goal}
            onChange={handleChange}
          />

          <input
            type="color"
            name="color"
            value={habit.color}
            onChange={handleChange}
          />

          <input
            name="icon"
            value={habit.icon}
            onChange={handleChange}
          />

          <button type="submit">
            Save Changes
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditHabit;
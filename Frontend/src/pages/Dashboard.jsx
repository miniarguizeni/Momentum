import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { getHabits } from "../services/habitService";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import HabitCard from "../components/HabitCard";
import StatsCard from "../components/StatsCard";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHabits = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getHabits(user.token);

      setHabits(data);
    } catch (error) {
      console.error("Error loading habits:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadHabits();
  }, [loadHabits]);
const totalHabits = habits.length;

const totalGoal = habits.reduce(
  (sum, habit) => sum + Number(habit.goal || 0),
  0
);
  return (
    <div className="dashboard">

      <Navbar />

      <div className="dashboard-header">
        <h1>Welcome back, {user.name} 👋</h1>
        <p>Keep building your universe, one habit at a time.</p>
      </div>

      <div className="stats-grid">

<StatsCard
  title="Total Habits"
  value={totalHabits}
  emoji="📋"
/>

<StatsCard
  title="Total Goal"
  value={`${totalGoal} days`}
  emoji="🎯"
/>

<StatsCard
  title="Current Streak"
  value="Coming Soon"
  emoji="🔥"
/>
      </div>

      <div className="section-title">
        <h2>Today's Habits</h2>
      </div>

      {loading ? (
        <p className="loading">Loading habits...</p>
      ) : habits.length === 0 ? (

        <div className="empty-state">

          <h2>🌙 No habits yet</h2>

          <p>
            Start your journey by creating your first habit.
          </p>

          <button
            className="add-btn"
            onClick={() => navigate("/add-habit")}
          >
            + Add Your First Habit
          </button>

        </div>

      ) : (

        <>
          <div className="habit-grid">

            {habits.map((habit) => (

              <HabitCard
                key={habit._id}
                habit={habit}
              />

            ))}

          </div>

          <div className="floating-button">

            <button
              className="add-btn"
              onClick={() => navigate("/add-habit")}
            >
              + Add Habit
            </button>

          </div>

        </>

      )}

    </div>
  );
}

export default Dashboard;
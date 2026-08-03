import { useNavigate } from "react-router-dom";
import { deleteHabit } from "../services/habitService";
import { useAuth } from "../context/AuthContext";

function HabitCard({ habit }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Delete "${habit.title}"?`
    );

    if (!confirmDelete) return;

    try {
      await deleteHabit(habit._id, user.token);

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Couldn't delete habit.");
    }
  };

  return (
    <div
      className="habit-card"
      style={{
        borderLeft: `6px solid ${habit.color}`,
      }}
    >
      <div className="habit-header">
        <div className="habit-icon">
          {habit.icon}
        </div>

        <h2>{habit.title}</h2>
      </div>

      <p>{habit.description}</p>

      <div className="badges">
        <span>{habit.category}</span>
        <span>{habit.frequency}</span>
      </div>

      <p>
        🎯 Goal: {habit.goal} days
      </p>

      <div className="habit-buttons">

        <button
          onClick={() =>
            navigate(`/edit-habit/${habit._id}`)
          }
        >
          ✏ Edit
        </button>

        <button
          onClick={handleDelete}
        >
          🗑 Delete
        </button>

      </div>
    </div>
  );
}

export default HabitCard;
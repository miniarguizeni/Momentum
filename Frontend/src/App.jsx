import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddHabit from "./pages/AddHabit";
import EditHabit from "./pages/EditHabit";

import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          user ? (
            <Dashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/add-habit"
        element={
          user ? <AddHabit /> : <Navigate to="/login" />
      }
      />
      <Route
  path="/edit-habit/:id"
  element={
    user ? (
      <EditHabit />
    ) : (
      <Navigate to="/login" />
    )
  }
/>

      <Route
        path="*"
        element={
          <Navigate to={user ? "/dashboard" : "/login"} />
        }
      />
    </Routes>
  );
}

export default App;
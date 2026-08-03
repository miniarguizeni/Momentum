import axios from "axios";

const API = "http://localhost:3000/api/habits";

const authHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getHabits = async (token) => {
  const response = await axios.get(API, authHeader(token));
  return response.data;
};

export const createHabit = async (habit, token) => {
  console.log("Habit:", habit);
  console.log("Token:", token);

  const response = await axios.post(API, habit, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateHabit = async (id, habit, token) => {
  const response = await axios.put(`${API}/${id}`, habit, authHeader(token));
  return response.data;
};

export const deleteHabit = async (id, token) => {
  const response = await axios.delete(`${API}/${id}`, authHeader(token));
  return response.data;
};
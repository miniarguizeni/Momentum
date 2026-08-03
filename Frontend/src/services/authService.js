import axios from "axios";

const API = "http://localhost:3000/api/auth";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API}/login`, {
      email,
      password,
    });

    console.log("✅ Login success:", response.data);

    return response.data;

  } catch (error) {

    console.log("❌ FULL ERROR:", error);

    console.log("❌ RESPONSE:", error.response);

    console.log("❌ DATA:", error.response?.data);

    throw error;
  }
};

export const register = async (name, email, password) => {
  const response = await axios.post(`${API}/register`, {
    name,
    email,
    password,
  });

  return response.data;
};
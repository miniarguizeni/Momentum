import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { login } from "../services/authService";

import { useAuth } from "../context/AuthContext";

function Login() {

const navigate = useNavigate();

const { loginUser } = useAuth();

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [error,setError]=useState("");

const handleSubmit=async(e)=>{

e.preventDefault();

try{

const data=await login(email,password);

loginUser(data);

navigate("/dashboard");

}catch (err) {
    console.log("LOGIN ERROR:", err.response);
    console.log("LOGIN DATA:", err.response?.data);
    setError(err.response?.data?.message || "Login failed");
}

};

return(

<div className="auth-container">

<div className="auth-card">

<h1>🌙 Momentum</h1>

<p>Build your universe one habit at a time.</p>

<form onSubmit={handleSubmit}>

<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>

<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>

<button>

Login

</button>

</form>

{error && <p>{error}</p>}

<p>

Don't have an account?

<Link to="/register">

 Register

</Link>

</p>

</div>

</div>

);

}

export default Login;
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {

const { user, logoutUser } = useAuth();

const navigate = useNavigate();

const handleLogout=()=>{

logoutUser();

navigate("/login");

};

return(

<nav className="navbar">

<div>

<h2>🌙 Momentum</h2>

<p>Build your universe one habit at a time</p>

</div>

<div className="nav-right">

<span>

👋 {user.name}

</span>

<button
className="logout-btn"
onClick={handleLogout}
>

Logout

</button>

</div>

</nav>

);

}

export default Navbar;
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        navigate("/login"); // Redirect if not logged in
        return null;
    }

    return (
        <div>
            <h2>Welcome, {user.userId}</h2>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import authentication context

export default function RedirectIfAuthenticated({ children }) {
    const { user } = useAuth(); // Get auth state
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/home", { replace: true }); // Redirect if user is logged in
        }
    }, [user, navigate]);

    return children; // Render the component normally if user is NOT logged in
}

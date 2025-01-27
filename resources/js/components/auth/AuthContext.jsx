import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const navigate = useNavigate();

    // Function to handle login
    const login = (token) => {
        localStorage.setItem("token", token);
        setToken(token);
        navigate("/home");
    };

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/");
    };

    // Redirect unauthorized users to login
    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token, navigate]);

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook to Use Auth
export const useAuth = () => useContext(AuthContext);

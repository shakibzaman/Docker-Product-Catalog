import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav style={styles.navbar}>
            <h2 style={styles.logo}>MyApp</h2>
            <ul style={styles.navLinks}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/user-list">User List</Link>
                </li>
                <li>
                    <Link to="/register">Create User</Link>
                </li>
                <li>
                    <Link to="/product-list">Product List</Link>
                </li>
            </ul>
        </nav>
    );
}

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#333",
        color: "#fff",
    },
    logo: { margin: 0 },
    navLinks: { display: "flex", gap: "15px", listStyle: "none" },
};

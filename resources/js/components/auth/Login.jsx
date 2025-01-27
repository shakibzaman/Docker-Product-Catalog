import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import AuthContext

const API_BASE_URL = "http://localhost:8283/api"; // API Base URL

const apiRequest = async (endpoint, method = "GET", data = null) => {
    try {
        const response = await axios({
            url: `${API_BASE_URL}${endpoint}`,
            method,
            data,
            headers: { "Content-Type": "application/json" },
        });
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "An error occurred",
        };
    }
};

export default function Login() {
    const { login } = useAuth(); // Get login function from context
    const navigate = useNavigate();

    useEffect(() => {
        if (login) {
            navigate("/home", { replace: true }); // Redirect to home if logged in
        }
    }, [login, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const onSubmit = async (data) => {
        setLoading(true);
        setMessage(null);

        try {
            const response = await apiRequest("/login", "POST", data);
            console.log("response", response);

            if (response.data.status === 200 && response.data.token) {
                setMessage({ type: "success", text: response.data.message });
                login(response.data.token); // Store token and redirect
            } else {
                setMessage({
                    type: "error",
                    text:
                        response.data.message ||
                        "Login failed. Please try again.",
                });
            }
        } catch (error) {
            setMessage({
                type: "error",
                text: "An error occurred while logging in. Please try again.",
            });
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
                    Login
                </h2>

                {message && (
                    <div
                        className={`p-3 mb-4 text-center rounded-lg ${
                            message.type === "success"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all duration-300"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

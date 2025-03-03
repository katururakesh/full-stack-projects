import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setError(""); // Reset error state
        setLoading(true);

        try {
            await login(credentials);
        } catch (err) {
            setError("Invalid username or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 max-w-md w-full border border-gray-200">
                <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Login</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-transform ${
                        loading ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-1 hover:shadow-2xl"
                    } focus:outline-none focus:ring-4 focus:ring-blue-300`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;

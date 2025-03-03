import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

// Register a new user
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        console.error("Registration failed:", error.response?.data || error.message);
        throw error;
    }
};

// Login user and get authentication token
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        console.log("User data:", response.data);
        if (response.data?.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error;
    }
};

// Logout the user
export const logout = () => {
    localStorage.removeItem("token");
    console.log("Logged out successfully.");
};

export default {
    login,
    logout,
    register,
};

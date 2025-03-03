import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Set auth token globally for axios
    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    };

    const login = async (credentials) => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", credentials);
            
            if (response && response.data) {
                const { id, token } = response.data;
                
                if (id && token) {
                    const userData = { userId: id, token };
                    setUser(userData);
                    localStorage.setItem("user", JSON.stringify(userData));
                    setAuthToken(token); // Set token globally
                    navigate('/'); // Redirect to home/dashboard after login
                } else {
                    console.error("User ID or token missing in the response");
                }
            }
        } catch (error) {
            console.error("Login error:", error.response?.data?.message || error.message);
        }
    };
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        setAuthToken(null);
        navigate('/login'); // Redirect to login page
    };

    useEffect(() => {
        const checkAuth = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setAuthToken(parsedUser.token);

                // Optional: Verify token validity with backend
                try {
                    await axios.get("http://localhost:8080/api/auth/validate");
                } catch (error) {
                    console.error("Session expired. Logging out...");
                    logout(); // Auto logout if token is invalid
                }
            }
            setLoading(false); // Stop loading once authentication is checked
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Header = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-900 p-4 shadow-md sticky top-0 w-full z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                {/* Logo / Home Link */}
                <NavLink to="/" className="text-white text-2xl font-bold">
                    🍔 Foodie
                </NavLink>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 items-center">
                    {!user ? (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive ? "text-blue-400 font-semibold" : "text-white hover:text-gray-400"
                                }
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    isActive ? "text-blue-400 font-semibold" : "text-white hover:text-gray-400"
                                }
                            >
                                Register
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/cart"
                                className={({ isActive }) =>
                                    isActive ? "text-blue-400 font-semibold" : "text-white hover:text-gray-400"
                                }
                            >
                                Cart 🛒
                            </NavLink>
                            <span className="text-white font-medium">👋 Hi, {user?.name || "User"}!</span>
                            <button
                                onClick={logout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white text-2xl"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden bg-gray-800 p-4 text-center space-y-4">
                    {!user ? (
                        <>
                            <NavLink
                                to="/login"
                                className="block text-white hover:text-gray-400"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className="block text-white hover:text-gray-400"
                                onClick={() => setIsOpen(false)}
                            >
                                Register
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/cart"
                                className="block text-white hover:text-gray-400"
                                onClick={() => setIsOpen(false)}
                            >
                                Cart 🛒
                            </NavLink>
                            <span className="block text-white">👋 Hi, {user?.name || "User"}!</span>
                            <button
                                onClick={logout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition w-full"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Header;

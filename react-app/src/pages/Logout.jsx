import { useAuth } from "../context/AuthContext";

const Logout = () => {
    const { logout } = useAuth();

    return (
        <button onClick={logout} className="bg-red-500 text-white p-2 rounded">
            Logout
        </button>
    );
};

export default Logout;

import { useAuth } from "../context/AuthContext";

const Footer = () => {
    const { user } = useAuth() || {};

    return (
        <footer className="bg-gray-900 text-gray-300 p-6 text-center mt-8 shadow-lg">
            <div className="container mx-auto">
                <p className="text-lg">&copy; {new Date().getFullYear()} 🍔 Foodie. All Rights Reserved.</p>

                {user && (
                    <p className="text-sm mt-2">
                        Logged in as <span className="font-semibold text-white">{user.name}</span>
                    </p>
                )}

                {/* Links */}
                <div className="mt-4 flex justify-center space-x-6">
                    <a href="/about" className="hover:text-white transition">About Us</a>
                    <a href="/contact" className="hover:text-white transition">Contact</a>
                    <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

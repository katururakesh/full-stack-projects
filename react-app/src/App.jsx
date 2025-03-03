import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js"; // PayPal Integration
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import CartComponent from "./components/CartComponent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MenuItemsByCategory from './pages/MenuItemsByCategory';
import MenuItemsByRestaurant from './pages/MenuItemsByRestaurant';
import OrdersComponent from "./pages/OrdersComponent";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import PaymentComponent from "./pages/PaymentComponent";

const App = () => (
    <Router>
        <AuthProvider>
            <PayPalScriptProvider options={{ "client-id": "AWtcANmsj64Frz9H4v-lFUFADA1yKtKPg3gA_usDq25Ttwjqih337_99UjOzhsuh0yJsopwOAlWecfnJ", currency: "USD" }}>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow p-4 bg-gray-100">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/" element={<Dashboard />} />
                            <Route path="*" element={<PageNotFound />} />
                            <Route path="/orders" element={<OrdersComponent />} />
                            <Route path="payment/:orderId" element={<PaymentComponent />} />
                            {/* Protected Routes */}
                            <Route path="/cart" element={
                                <ProtectedRoute>
                                    <CartComponent />
                                </ProtectedRoute>
                            } />
                            <Route path="/menu-items/category/:categoryId" element={<MenuItemsByCategory />} />
                            <Route path="/menu-items/restaurant/:restaurantId" element={<MenuItemsByRestaurant />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </PayPalScriptProvider>
        </AuthProvider>
    </Router>
);

export default App;

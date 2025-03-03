import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { addItemToCart } from '../services/cartService';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MenuItemsByCategory = () => {
    const { categoryId } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/menu-items/category/${categoryId}`);
                setMenuItems(response.data || []);
            } catch (error) {
                setError('Error fetching menu items by category.');
                console.error('API Fetch Error:', error);
            }
        };

        if (categoryId) fetchMenuItems();
    }, [categoryId]);

    const handleAddToCart = async (menuItemId) => {
        if (!user) return alert('Please login to add items to your cart.');

        try {
            await addItemToCart(user.userId, menuItemId);
            alert('Item added to cart successfully!');
        } catch (error) {
            console.error('Failed to add item to cart:', error);
            alert('Error adding item to cart.');
        }
    };

    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                    Menu Items for Category #{categoryId}
                </h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* 🚀 Featured Menu Items Carousel */}
                {menuItems.length > 0 && (
                    <>
                        <h3 className="text-3xl font-semibold text-gray-900 mb-6">Featured Items</h3>
                        <Slider {...carouselSettings} className="mb-12">
                            {menuItems.slice(0, 6).map(item => (
                                <div key={item.id} className="p-5">
                                    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition transform hover:-translate-y-1">
                                        <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h4>
                                        {item.image ? (
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="w-40 h-40 object-cover rounded-md"
                                            />
                                        ) : (
                                            <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-md">
                                                <span className="text-gray-500">No Image</span>
                                            </div>
                                        )}
                                        <p className="text-green-600 font-bold text-lg mt-3">₹{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </>
                )}

                {/* 📦 All Menu Items Grid */}
                <h3 className="text-3xl font-semibold text-gray-900 mb-6">All Menu Items</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {menuItems.map(item => (
                        <div 
                            key={item.id} 
                            className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
                        >
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h4>
                            <p className="text-gray-600 mb-3">{item.description}</p>
                            <p className="text-green-600 font-bold text-lg mb-4">₹{item.price}</p>

                            {/* Image */}
                            <div className="mb-4">
                                {item.image ? (
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-full h-40 object-cover rounded-md"
                                    />
                                ) : (
                                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md">
                                        <span className="text-gray-500">No Image</span>
                                    </div>
                                )}
                            </div>

                            <button
                                className="bg-blue-500 text-white px-5 py-2 rounded-md w-full font-medium shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
                                onClick={() => handleAddToCart(item.id)}
                                disabled={!user}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>

                {/* 🛒 Go to Cart Button */}
                <div className="mt-10 flex justify-center">
                    <Link 
                        to="/cart" 
                        className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition-transform transform hover:scale-105"
                    >
                        Go to Cart
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MenuItemsByCategory;

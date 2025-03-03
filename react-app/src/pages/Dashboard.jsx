import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryError, setCategoryError] = useState("");
  const [restaurantError, setRestaurantError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, restaurantRes] = await Promise.all([
          axios.get("http://localhost:8080/api/categories"),
          axios.get("http://localhost:8080/api/restaurants"),
        ]);
        setCategories(categoryRes.data);
        setRestaurants(restaurantRes.data);
      } catch (error) {
        if (error.response?.config?.url.includes("categories")) {
          setCategoryError("Error fetching categories.");
        } else if (error.response?.config?.url.includes("restaurants")) {
          setRestaurantError("Error fetching restaurants.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-800">Dashboard</h2>
          <Link
            to="/orders"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            View My Orders
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-700 text-lg">Loading...</p>
        ) : (
          <>
            {/* Category Carousel */}
            <h3 className="text-3xl font-semibold text-gray-900 mb-6">Featured Categories</h3>
            {categoryError && <p className="text-red-500 mb-4">{categoryError}</p>}
            <Slider {...carouselSettings} className="mb-12">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/menu-items/category/${category.id}`}
                  className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-transform transform hover:-translate-y-2"
                >
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">{category.name}</h4>
                  {category.images?.length > 0 ? (
                    <img
                      src={`http://localhost:8080${category.images[0].downloadUrl}`}
                      alt={category.name}
                      className="w-40 h-40 object-cover rounded-lg border shadow-md"
                    />
                  ) : (
                    <p className="text-sm text-gray-500">No image available</p>
                  )}
                </Link>
              ))}
            </Slider>

            {/* Restaurant Carousel */}
            <h3 className="text-3xl font-semibold text-gray-900 mb-6">Featured Restaurants</h3>
            {restaurantError && <p className="text-red-500 mb-4">{restaurantError}</p>}
            <Slider {...carouselSettings} className="mb-12">
              {restaurants.map((restaurant) => (
                <Link
                  key={restaurant.id}
                  to={`/menu-items/restaurant/${restaurant.id}`}
                  className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-transform transform hover:-translate-y-2"
                >
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">{restaurant.name}</h4>
                  {restaurant.images?.length > 0 ? (
                    <img
                      src={`http://localhost:8080${restaurant.images[0].downloadUrl}`}
                      alt={restaurant.name}
                      className="w-40 h-40 object-cover rounded-lg border shadow-md"
                    />
                  ) : (
                    <p className="text-sm text-gray-500">No image available</p>
                  )}
                </Link>
              ))}
            </Slider>

            {/* Category Grid */}
            <h3 className="text-3xl font-semibold text-gray-900 mb-6">All Categories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/menu-items/category/${category.id}`}
                  className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-transform transform hover:-translate-y-2"
                >
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">{category.name}</h4>
                  {category.images?.length > 0 ? (
                    <img
                      src={`http://localhost:8080${category.images[0].downloadUrl}`}
                      alt={category.name}
                      className="w-28 h-28 object-cover rounded-lg border shadow-md"
                    />
                  ) : (
                    <p className="text-sm text-gray-500">No image available</p>
                  )}
                </Link>
              ))}
            </div>

            {/* Restaurant Grid */}
            <h3 className="text-3xl font-semibold text-gray-900 mb-6">All Restaurants</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {restaurants.map((restaurant) => (
                <Link
                  key={restaurant.id}
                  to={`/menu-items/restaurant/${restaurant.id}`}
                  className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-transform transform hover:-translate-y-2"
                >
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">{restaurant.name}</h4>
                  {restaurant.images?.length > 0 ? (
                    <img
                      src={`http://localhost:8080${restaurant.images[0].downloadUrl}`}
                      alt={restaurant.name}
                      className="w-28 h-28 object-cover rounded-lg border shadow-md"
                    />
                  ) : (
                    <p className="text-sm text-gray-500">No image available</p>
                  )}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

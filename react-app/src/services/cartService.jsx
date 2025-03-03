import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cart';

const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
};

// Get cart by user ID
export const getCartByUserId = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.userId) {
            console.error('User ID not found');
            return;
        }
        
        const response = await axios.get(`${API_URL}/${user.userId}`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};


// Add item to cart
export const addItemToCart = async (userId, menuItemId) => {
    try {
        const response = await axios.post(`${API_URL}/${userId}/add/${menuItemId}`);
        return response.data;
    } catch (error) {
        console.error('Error adding item to cart:', error);
        throw error;
    }
};

// Remove item from cart
export const removeFromCart = async (userId, menuItemId) => {
    const user = JSON.parse(localStorage.getItem('user'));

    try {
        const response = await axios.delete(`${API_URL}/${userId}/remove/${menuItemId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing item from cart:', error);
        throw error;
    }
};

// Clear cart
export const clearCart = async (userId) => {
    try {
        await axios.delete(`${API_URL}/${userId}/clear`);
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
    }
};

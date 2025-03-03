import axios from 'axios';

const API_URL = 'http://localhost:8080/api/orders';

const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
};

// Create a new order
export const createOrder = async (userId, menuItemIds) => {
    try {
        const response = await axios.post(`${API_URL}/${userId}`, menuItemIds, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

// Get all orders by user ID
export const getOrdersByUserId = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.userId) {
            console.error('User ID not found');
            return [];
        }

        const response = await axios.get(`${API_URL}/user/${user.userId}`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

// Get a single order by order ID
export const getOrderById = async (orderId) => {
    try {
        const response = await axios.get(`${API_URL}/${orderId}`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching order details:', error);
        throw error;
    }
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await axios.put(`${API_URL}/${orderId}/status?status=${status}`, {}, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};

// Cancel order
export const cancelOrder = async (orderId) => {
    try {
        const response = await axios.put(`${API_URL}/${orderId}/cancel`, {}, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error canceling order:', error);
        throw error;
    }
};

// Delete an order
export const deleteOrder = async (orderId) => {
    try {
        await axios.delete(`${API_URL}/delete/${orderId}`, {
            headers: getAuthHeaders(),
        });
    } catch (error) {
        console.error('Error deleting order:', error);
        throw error;
    }
};

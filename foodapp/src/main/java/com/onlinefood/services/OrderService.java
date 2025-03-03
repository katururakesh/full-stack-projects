package com.onlinefood.services;

import com.onlinefood.model.Order;
import com.onlinefood.model.User;
import com.onlinefood.model.MenuItems;
import com.onlinefood.repo.MenuItemsRepository;
import com.onlinefood.repo.OrderRepository;
import com.onlinefood.repo.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MenuItemsRepository menuItemsRepository;

    // Create a new order
    public Order createOrder(Long userId, List<Long> menuItemIds) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        List<MenuItems> items = menuItemsRepository.findAllById(menuItemIds);
        double totalPrice = items.stream().mapToDouble(MenuItems::getPrice).sum();

        Order order = Order.builder()
                .user(user)
                .items(items)
                .totalPrice(totalPrice)
                .orderDate(LocalDateTime.now())
                .status("PENDING")
                .build();

        return orderRepository.save(order);
    }

    // Get all orders by user ID
    public List<Order> getOrdersByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUser(user);
    }

    // Get order by ID
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    // Update order status
    public Order updateOrderStatus(Long orderId, String status) {
        Order order = getOrderById(orderId);
        order.setStatus(status.toUpperCase());
        return orderRepository.save(order);
    }

    public Order cancelOrder(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);

        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            if (!order.getStatus().equalsIgnoreCase("PAID")) { // Ensure paid orders aren't canceled
                order.setStatus("CANCELLED");
                return orderRepository.save(order); // Save and return updated order
            } else {
                throw new RuntimeException("Paid orders cannot be cancelled.");
            }
        } else {
            throw new RuntimeException("Order not found.");
        }
    }

    public Order findByPaypalPaymentId(String paymentId) {
        return orderRepository.findByPaypalPaymentId(paymentId);
    }

    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }
}

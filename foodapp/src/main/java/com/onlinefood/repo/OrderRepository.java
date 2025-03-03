package com.onlinefood.repo;

import com.onlinefood.model.Order;
import com.onlinefood.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);

    Order findByPaypalPaymentId(String paymentId);
}

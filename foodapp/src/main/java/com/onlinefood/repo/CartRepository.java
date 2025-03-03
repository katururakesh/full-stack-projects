package com.onlinefood.repo;

import com.onlinefood.model.Cart;
import com.onlinefood.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUser(User user);

    Optional<Cart> findByUserId(Long userId);
}

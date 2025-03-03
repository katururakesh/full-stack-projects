package com.onlinefood.controller;

import com.onlinefood.model.Cart;
import com.onlinefood.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Get cart by user ID
    @GetMapping("/{userId}")
    public Cart getCartByUserId(@PathVariable Long userId) {
        return cartService.getCartByUserId(userId);
    }

    // Add item to cart
    @PostMapping("/{userId}/add/{menuItemId}")
    public Cart addItemToCart(@PathVariable Long userId, @PathVariable Long menuItemId) {
        return cartService.addItemToCart(userId, menuItemId);
    }

    // Remove item from cart
    @DeleteMapping("/{userId}/remove/{menuItemId}")
    public Cart removeItemFromCart(@PathVariable Long userId, @PathVariable Long menuItemId) {
        return cartService.removeItemFromCart(userId, menuItemId);
    }

    // Clear cart
    @DeleteMapping("/{userId}/clear")
    public void clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
    }
}

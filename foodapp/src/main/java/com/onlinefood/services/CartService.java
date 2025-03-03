package com.onlinefood.services;

import com.onlinefood.model.Cart;
import com.onlinefood.model.MenuItems;
import com.onlinefood.model.User;

import com.onlinefood.repo.CartRepository;
import com.onlinefood.repo.MenuItemsRepository;
import com.onlinefood.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private MenuItemsRepository menuItemsRepository;

    @Autowired
    private UserRepository userRepository;

    // Get cart by user ID
    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId).orElseGet(() -> createNewCartForUser(userId));
    }

    private Cart createNewCartForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart newCart = Cart.builder()
                .user(user)
                .items(new ArrayList<>())
                .totalPrice(0.0)
                .build();

        return cartRepository.save(newCart);
    }


    // Add item to cart
    public Cart addItemToCart(Long userId, Long menuItemId) {
        // Fetch or create the user's cart
        Cart cart = getCartByUserId(userId);

        // Retrieve the menu item from the repository
        MenuItems menuItem = menuItemsRepository.findById(menuItemId)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        // Add the item to the cart if not already present
        if (!cart.getItems().contains(menuItem)) {
            cart.getItems().add(menuItem);
            cart.setTotalPrice(cart.getTotalPrice() + menuItem.getPrice());
        } else {
            System.out.println("Item already exists in the cart.");
        }

        // Save the updated cart to the repository and return
        return cartRepository.save(cart);
    }


    // Remove item from cart
    public Cart removeItemFromCart(Long userId, Long menuItemId) {
        Cart cart = getCartByUserId(userId);
        MenuItems menuItem = menuItemsRepository.findById(menuItemId)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        if (cart.getItems().contains(menuItem)) {
            cart.getItems().remove(menuItem);
            cart.setTotalPrice(cart.getTotalPrice() - menuItem.getPrice());
        }
        return cartRepository.save(cart);
    }

    // Clear cart
    public void clearCart(Long userId) {
        Cart cart = getCartByUserId(userId);
        cart.getItems().clear();
        cart.setTotalPrice(0.0);
        cartRepository.save(cart);
    }
}

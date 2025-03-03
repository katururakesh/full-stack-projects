package com.onlinefood.controller;

import com.onlinefood.dto.RestaurantDto;
import com.onlinefood.exceptions.ResourceNotFoundException;
import com.onlinefood.model.Category;
import com.onlinefood.model.Restaurant;
import com.onlinefood.services.IRestaurantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {
    private final IRestaurantService restaurantService;

    public RestaurantController(IRestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        return new ResponseEntity<>(restaurantService.getAllRestaurants(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRestaurantById(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(restaurantService.getRestaurantById(id), HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Restaurant> addRestaurant(@RequestBody RestaurantDto restaurantDto) {
        try {
            return new ResponseEntity<>(restaurantService.addRestaurant(restaurantDto), HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        try {
            restaurantService.deleteRestaurant(id);
            return new ResponseEntity<>("Delete success", HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}

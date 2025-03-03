package com.onlinefood.services;

import com.onlinefood.dto.MenuItemDto;
import com.onlinefood.dto.RestaurantDto;
import com.onlinefood.model.Restaurant;

import java.awt.*;
import java.util.List;

public interface IRestaurantService {
    List<Restaurant> getAllRestaurants();
    Restaurant getRestaurantById(Long id);
    Restaurant addRestaurant(RestaurantDto restaurantDto);
    void updateRestaurant(Long id, RestaurantDto restaurantDto);
    void deleteRestaurant(Long id);

}

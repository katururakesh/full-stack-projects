package com.onlinefood.services;

import com.onlinefood.dto.RestaurantDto;
import com.onlinefood.exceptions.ResourceNotFoundException;
import com.onlinefood.model.Restaurant;
import com.onlinefood.repo.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RestaurantServiceImpl implements IRestaurantService{
    private final RestaurantRepository restaurantRepository;

    public RestaurantServiceImpl(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @Override
    public Restaurant getRestaurantById(Long id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found!"));
    }

    @Override
    public Restaurant addRestaurant(RestaurantDto restaurantDto) {
        Restaurant restaurant = new Restaurant();
        restaurant.setName(restaurantDto.getName());
        restaurant.setAddress(restaurantDto.getAddress());
        restaurant.setDescription(restaurantDto.getDescription());
        restaurant.setImages(new ArrayList<>());
        restaurant.setMenuItems(new ArrayList<>());
        return restaurantRepository.save(restaurant);
    }

    @Override
    public void updateRestaurant(Long id, RestaurantDto restaurantDto) {

    }

    @Override
    public void deleteRestaurant(Long id) {
        restaurantRepository.findById(id)
                .ifPresentOrElse(restaurantRepository::delete, () -> {
                    throw new ResourceNotFoundException("Restaurant not found!");
                });
    }
}

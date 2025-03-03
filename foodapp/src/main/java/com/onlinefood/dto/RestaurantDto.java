package com.onlinefood.dto;

import lombok.Data;

@Data
public class RestaurantDto {
    private Long id;
    private String name;
    private String address;
    private String description;
}

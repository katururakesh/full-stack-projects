package com.onlinefood.dto;

import com.onlinefood.model.Image;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MenuItemDto {
    private Long id;
    private String name;
    private Double price;
    private String description;
    private Long categoryId;
    private Long restaurantId;
    private List<ImageDto> images;
}

package com.onlinefood.services;

import com.onlinefood.dto.ImageDto;
import com.onlinefood.dto.MenuItemDto;
import com.onlinefood.exceptions.ResourceNotFoundException;
import com.onlinefood.model.Category;
import com.onlinefood.model.Image;
import com.onlinefood.model.MenuItems;
import com.onlinefood.model.Restaurant;
import com.onlinefood.repo.MenuItemsRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MenuItemServiceImpl implements IMenuItemsService{
    private final MenuItemsRepository menuItemsRepository;
    private final IRestaurantService restaurantService;
    private final ICategoryService categoryService;

    public MenuItemServiceImpl(MenuItemsRepository menuItemsRepository, IRestaurantService restaurantService, ICategoryService categoryService) {
        this.menuItemsRepository = menuItemsRepository;
        this.restaurantService = restaurantService;
        this.categoryService = categoryService;
    }

    @Override
    public List<MenuItems> getAllItems() {
        return menuItemsRepository.findAll();
    }

    @Override
    public MenuItems getMenuItemById(Long menuItemId) {
        return menuItemsRepository.findById(menuItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Menu-item not found!"));
    }

    @Override
    public MenuItems addMenuItem(MenuItemDto menuItemDto) {
        Restaurant restaurant = restaurantService.getRestaurantById(menuItemDto.getRestaurantId());
        Category category = categoryService.getCategoryById(menuItemDto.getCategoryId());

        MenuItems items = new MenuItems();
        items.setName(menuItemDto.getName());
        items.setPrice(menuItemDto.getPrice());
        items.setDescription(menuItemDto.getDescription());
        if (restaurant != null) {
            items.setRestaurant(restaurant);
        }
        if (category != null) {
            items.setCategory(category);
        }
        items.setImages(new ArrayList<>());
        return menuItemsRepository.save(items);
    }

    @Override
    public void updateMenuItem(Long id, MenuItemDto menuItemDto) {

    }

    @Override
    public void deleteMenuItem(Long id) {
        menuItemsRepository.findById(id)
                .ifPresentOrElse(menuItemsRepository::delete, () -> {
                    throw new ResourceNotFoundException("MenuItem not found");
                });
    }

    @Override
    public List<MenuItemDto> getByRestaurantId(Long restaurantId) {
        return menuItemsRepository.findByRestaurantId(restaurantId)
                .stream()
                .map(menuItem -> MenuItemDto.builder()
                        .id(menuItem.getId())
                        .name(menuItem.getName())
                        .price(menuItem.getPrice())
                        .description(menuItem.getDescription())
                        .categoryId(menuItem.getCategory().getId())
                        .restaurantId(menuItem.getRestaurant().getId())
                        .images(new ArrayList<>())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public List<MenuItemDto> getByCategoryId(Long categoryId) {
        return menuItemsRepository.findByCategoryId(categoryId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private MenuItemDto convertToDto(MenuItems menuItem) {
        return MenuItemDto.builder()
                .id(menuItem.getId())
                .name(menuItem.getName())
                .price(menuItem.getPrice())
                .description(menuItem.getDescription())
                .categoryId(menuItem.getCategory().getId())
                .restaurantId(menuItem.getRestaurant().getId())
                .images(menuItem.getImages().stream().map(this::convertImageToDto).collect(Collectors.toList()))
                .build();
    }

    private ImageDto convertImageToDto(Image image) {
        return new ImageDto(
                image.getId(),
                image.getFileName(),
                image.getFileType(),
                image.getDownloadUrl()
        );
    }
}

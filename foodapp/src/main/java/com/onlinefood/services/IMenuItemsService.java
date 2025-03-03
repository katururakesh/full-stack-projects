package com.onlinefood.services;

import com.onlinefood.dto.MenuItemDto;
import com.onlinefood.model.MenuItems;

import java.util.List;

public interface IMenuItemsService {
    List<MenuItems> getAllItems();
    MenuItems getMenuItemById(Long menuItemId);
    MenuItems addMenuItem(MenuItemDto menuItemDto);
    void updateMenuItem(Long id, MenuItemDto menuItemDto);
    void deleteMenuItem(Long id);
    List<MenuItemDto> getByRestaurantId(Long id);
    List<MenuItemDto> getByCategoryId(Long categoryId);
}

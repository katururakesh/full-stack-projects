package com.onlinefood.controller;

import com.onlinefood.dto.MenuItemDto;
import com.onlinefood.exceptions.ResourceNotFoundException;
import com.onlinefood.model.MenuItems;
import com.onlinefood.services.IMenuItemsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu-items")
public class MenuItemController {
    private final IMenuItemsService menuItemsService;

    public MenuItemController(IMenuItemsService menuItemsService) {
        this.menuItemsService = menuItemsService;
    }

    @GetMapping
    public ResponseEntity<List<MenuItems>> getAllItems() {
        return new ResponseEntity<>(menuItemsService.getAllItems(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getItemById(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(menuItemsService.getMenuItemById(id), HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<MenuItems> addItem(@RequestBody MenuItemDto menuItemDto) {
        try {
            return new ResponseEntity<>(menuItemsService.addMenuItem(menuItemDto), HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        try {
            menuItemsService.deleteMenuItem(id);
            return new ResponseEntity<>("delete success", HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/restaurant/{id}")
    public ResponseEntity<List<MenuItemDto>> getByRestaurantId(@PathVariable Long id) {
        try {
            List<MenuItemDto> menuItems = menuItemsService.getByRestaurantId(id);
            if (menuItems.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(menuItems, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<List<MenuItemDto>> getByCategoryId(@PathVariable Long id) {
        try {
            List<MenuItemDto> menuItems = menuItemsService.getByCategoryId(id);
            if (menuItems.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(menuItems, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

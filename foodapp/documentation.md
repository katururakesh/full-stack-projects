# Project Documentation

## Overview of the Project
This project is an online food ordering application that allows users to browse restaurants, view menu items, and place orders. It provides a user-friendly interface and integrates with payment services for seamless transactions.

## Abstraction
The project utilizes abstraction through interfaces and abstract classes to define common behaviors and promote code reuse. Key abstractions include:
- **Service Interfaces**: Define the operations for managing entities like restaurants, menu items, and categories.
- **Repository Interfaces**: Abstract the data access layer, allowing for easy interaction with the database.

## Service Interfaces
### IRestaurantService
- `List<Restaurant> getAllRestaurants()`: Retrieves all restaurants.
- `Restaurant getRestaurantById(Long id)`: Retrieves a restaurant by its ID.
- `Restaurant addRestaurant(RestaurantDto restaurantDto)`: Adds a new restaurant.
- `void updateRestaurant(Long id, RestaurantDto restaurantDto)`: Updates an existing restaurant.
- `void deleteRestaurant(Long id)`: Deletes a restaurant by its ID.

### IMenuItemsService
- `List<MenuItems> getAllItems()`: Retrieves all menu items.
- `MenuItems getMenuItemById(Long menuItemId)`: Retrieves a menu item by its ID.
- `MenuItems addMenuItem(MenuItemDto menuItemDto)`: Adds a new menu item.
- `void updateMenuItem(Long id, MenuItemDto menuItemDto)`: Updates an existing menu item.
- `void deleteMenuItem(Long id)`: Deletes a menu item by its ID.
- `List<MenuItemDto> getByRestaurantId(Long id)`: Retrieves menu items by restaurant ID.
- `List<MenuItemDto> getByCategoryId(Long categoryId)`: Retrieves menu items by category ID.

### ICategoryService
- `List<Category> getAllCategories()`: Retrieves all categories.
- `Category getCategoryById(Long id)`: Retrieves a category by its ID.
- `Category addCategory(CategoryDto categoryDto)`: Adds a new category.
- `void updateCategory(Long id, CategoryDto categoryDto)`: Updates an existing category.
- `void deleteCategoryById(Long id)`: Deletes a category by its ID.

### IImageService
- `Image getImageById(Long id)`: Retrieves an image by its ID.
- `void deleteImageById(Long id)`: Deletes an image by its ID.
- `List<ImageDto> saveImage(List<MultipartFile> file, Long categoryId, Long restaurantId, Long menuItemId)`: Saves images.
- `void updateImage(MultipartFile file, Long imageId)`: Updates an existing image.

## Repository Interfaces
### RestaurantRepository
- Extends `JpaRepository<Restaurant, Long>` for CRUD operations on Restaurant entities.

### MenuItemsRepository
- Extends `JpaRepository<MenuItems, Long>` for CRUD operations on MenuItems entities.
- `List<MenuItems> findByCategoryId(Long id)`: Finds menu items by category ID.
- `List<MenuItems> findByRestaurantId(Long id)`: Finds menu items by restaurant ID.

### CategoryRepository
- Extends `JpaRepository<Category, Long>` for CRUD operations on Category entities.

### ImageRepository
- Extends `JpaRepository<Image, Long>` for CRUD operations on Image entities.

## Controller Classes
### RestaurantController
- Handles API requests related to restaurants.

### MenuItemController
- Handles API requests related to menu items.

### CategoryController
- Handles API requests related to categories.

### ImageController
- Handles API requests related to images.

## Model Classes
- **Restaurant**: Represents a restaurant entity.
- **MenuItems**: Represents a menu item entity.
- **Category**: Represents a category entity.
- **Image**: Represents an image entity.

## Application Configuration
The main application class `FoodappApplication` is responsible for bootstrapping the Spring Boot application.

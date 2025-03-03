package com.onlinefood.services;

import com.onlinefood.dto.ImageDto;
import com.onlinefood.exceptions.ResourceNotFoundException;
import com.onlinefood.model.Category;
import com.onlinefood.model.Image;
import com.onlinefood.model.MenuItems;
import com.onlinefood.model.Restaurant;
import com.onlinefood.repo.ImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ImageServiceImpl implements IImageService{
    private final ImageRepository imageRepository;
    private final ICategoryService categoryService;
    private final IRestaurantService restaurantService;
    private final IMenuItemsService menuItemsService;

    public ImageServiceImpl(ImageRepository imageRepository, ICategoryService categoryService, IRestaurantService restaurantService, IMenuItemsService menuItemsService) {
        this.imageRepository = imageRepository;
        this.categoryService = categoryService;
        this.restaurantService = restaurantService;
        this.menuItemsService = menuItemsService;
    }

    @Override
    public Image getImageById(Long id) {
        return imageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Image Not Found"));
    }

    @Override
    public void deleteImageById(Long id) {
        imageRepository.findById(id).ifPresentOrElse(imageRepository::delete, () -> {
            throw new ResourceNotFoundException("Image not found!");
        });
    }

    @Override
    public List<ImageDto> saveImage(List<MultipartFile> files, Long categoryId, Long restaurantId, Long menuItemId) {
        List<ImageDto> savedImageDto = new ArrayList<>();

        // Fetch the category and restaurant if IDs are provided
        Category category = (categoryId != null) ? categoryService.getCategoryById(categoryId) : null;
        Restaurant restaurant = (restaurantId != null) ? restaurantService.getRestaurantById(restaurantId) : null;
        MenuItems menuItem = (menuItemId != null) ? menuItemsService.getMenuItemById(menuItemId) : null;

        for (MultipartFile file : files) {
            try {
                Image image = new Image();
                image.setFileName(file.getOriginalFilename());
                image.setFileType(file.getContentType());
                image.setImage(new SerialBlob(file.getBytes()));

                if (category != null) {
                    image.setCategory(category);
                }
                if (restaurant != null) {
                    image.setRestaurant(restaurant);
                }
                if (menuItem != null) {
                    image.setMenuItem(menuItem);
                }

                Image savedImage = imageRepository.save(image);
                String downloadUrl = "/api/images/image/download/" + savedImage.getId();
                savedImage.setDownloadUrl(downloadUrl);
                imageRepository.save(savedImage); // Save again to update download URL

                ImageDto imageDto = new ImageDto();
                imageDto.setId(savedImage.getId());
                imageDto.setFileType(savedImage.getFileType());
                imageDto.setDownloadUrl(savedImage.getDownloadUrl());
                savedImageDto.add(imageDto);

            } catch (SQLException | IOException e) {
                throw new RuntimeException("Failed to save image", e);
            }
        }

        return savedImageDto;
    }


    @Override
    public void updateImage(MultipartFile file, Long imageId) {
        Image image = getImageById(imageId);

        try {
            image.setFileName(file.getOriginalFilename());
            image.setFileName(file.getOriginalFilename());
            image.setImage(new SerialBlob(file.getBytes()));
            imageRepository.save(image);
        } catch (SQLException | IOException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}

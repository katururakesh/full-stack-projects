package com.onlinefood.services;

import com.onlinefood.dto.ImageDto;
import com.onlinefood.model.Image;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IImageService {
    Image getImageById(Long id);
    void deleteImageById(Long id);
    List<ImageDto> saveImage(List<MultipartFile> file, Long categoryId, Long restaurantId, Long menuItemId);
    void updateImage(MultipartFile file, Long imageId);
}

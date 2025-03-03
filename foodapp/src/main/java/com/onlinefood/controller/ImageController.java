package com.onlinefood.controller;

import com.onlinefood.dto.ImageDto;
import com.onlinefood.exceptions.ResourceNotFoundException;
import com.onlinefood.model.Image;
import com.onlinefood.services.IImageService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.SQLException;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/api/images")
public class ImageController {
    private final IImageService imageService;

    public ImageController(IImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> saveImages(
            @RequestParam List<MultipartFile> files,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long restaurantId,
            @RequestParam(required = false) Long menuItemId
    ) {
        try {
            if (categoryId == null && restaurantId == null && menuItemId == null) {
                return ResponseEntity.badRequest().body("Either categoryId or restaurantId or menuItemId must be provided.");
            }

            List<ImageDto> imageDtos = imageService.saveImage(files, categoryId, restaurantId, menuItemId);
            return new ResponseEntity<>(imageDtos, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


    @GetMapping("/image/download/{imageId}")
    public ResponseEntity<Resource> download(@PathVariable Long imageId) throws SQLException {
        Image image = imageService.getImageById(imageId);

        ByteArrayResource resource = new ByteArrayResource(image.getImage().getBytes(1L, (int) image.getImage().length()));
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(image.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + image.getFileName() + "\"")
                .body(resource);
    }

    @PutMapping("/{imageId}/update")
    public ResponseEntity<String> updateImage(@PathVariable Long imageId, @RequestParam MultipartFile file) {
        try {
            imageService.getImageById(imageId);
            return ResponseEntity.ok("Update success");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{imageId}/delete")
    public ResponseEntity<String> deleteImage(@PathVariable Long imageId) {
        try {
            imageService.deleteImageById(imageId);
            return ResponseEntity.ok("Delete success");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(e.getMessage());
        }
    }
}

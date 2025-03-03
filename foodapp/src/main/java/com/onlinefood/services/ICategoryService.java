package com.onlinefood.services;

import com.onlinefood.dto.CategoryDto;
import com.onlinefood.model.Category;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ICategoryService {
    List<Category> getAllCategories();
    Category getCategoryById(Long id);
    Category addCategory(CategoryDto categoryDto);
    void updateCategory(Long id, CategoryDto categoryDto);
    void deleteCategoryById(Long id);
}

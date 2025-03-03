package com.onlinefood.services;

import com.onlinefood.dto.CategoryDto;
import com.onlinefood.exceptions.ResourceNotFoundException;
import com.onlinefood.model.Category;
import com.onlinefood.repo.CategoryRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryServiceImpl implements ICategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category Not Found!"));
    }

    @Override
    public Category addCategory(CategoryDto categoryDto) {
        Category category = new Category();
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
        category.setImages(new ArrayList<>());
        return categoryRepository.save(category);
    }

    @Override
    public void updateCategory(Long id, CategoryDto categoryDto) {

    }

    @Override
    public void deleteCategoryById(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category Not Found!");
        }
        categoryRepository.deleteById(id);
    }
}

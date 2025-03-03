package com.swiggy.service;

import com.swiggy.model.Category;
import com.swiggy.model.SubCategories;
import com.swiggy.repository.CategoryRepository;
import com.swiggy.repository.SubCategoriesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubCategoriesService {

    private final SubCategoriesRepository subCategoriesRepository;
    private final CategoryRepository categoryRepository;

    // Create a new subcategory
    public SubCategories createSubCategory(SubCategories subCategory) {
        Category category = categoryRepository.findByName(subCategory.getCategory().getName())
                .orElseThrow(() -> new RuntimeException("Category not found: " + subCategory.getCategory().getName()));

        subCategory.setCategory(category);
        return subCategoriesRepository.save(subCategory);
    }

    // Get all subcategories
    public List<SubCategories> getAllSubCategories() {
        return subCategoriesRepository.findAll();
    }

    // Get a subcategory by name
    public SubCategories getSubCategoryByName(String name) {
        return subCategoriesRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("SubCategory not found: " + name));
    }

    // Update a subcategory
    public SubCategories updateSubCategory(String id, SubCategories updatedSubCategory) {
        Optional<SubCategories> existingSubCategory = subCategoriesRepository.findById(id);

        if (existingSubCategory.isPresent()) {
            SubCategories subCategory = existingSubCategory.get();
            subCategory.setName(updatedSubCategory.getName());
            subCategory.setImageUrl(updatedSubCategory.getImageUrl());
            subCategory.setDescription(updatedSubCategory.getDescription());
            subCategory.setItems(updatedSubCategory.getItems());
            return subCategoriesRepository.save(subCategory);
        } else {
            throw new RuntimeException("SubCategory not found: " + id);
        }
    }

    // Delete a subcategory by name
    public void deleteSubCategoryByName(String name) {
        SubCategories subCategory = getSubCategoryByName(name);
        subCategoriesRepository.delete(subCategory);
    }
}

package com.swiggy.repository;

import com.swiggy.model.SubCategories;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SubCategoryRepository extends MongoRepository<SubCategories, String> {
}

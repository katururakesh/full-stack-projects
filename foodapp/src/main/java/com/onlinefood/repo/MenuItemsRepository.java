package com.onlinefood.repo;

import com.onlinefood.model.MenuItems;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuItemsRepository extends JpaRepository<MenuItems, Long> {
    List<MenuItems> findByCategoryId(Long id);

    List<MenuItems> findByRestaurantId(Long id);
}

package com.dh.turistearte.turistearte.repository;

import com.dh.turistearte.turistearte.Entity.Category;
import com.dh.turistearte.turistearte.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    @Query("SELECT c.products FROM Category c WHERE c.idcategory = :categoryId")
    Set<Product> findProductsByCategoryId(@Param("categoryId") Long categoryId);
}

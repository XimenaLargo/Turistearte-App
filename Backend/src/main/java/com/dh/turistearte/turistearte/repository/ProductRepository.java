package com.dh.turistearte.turistearte.repository;

import com.dh.turistearte.turistearte.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface  ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p WHERE p.name =?1")
    Set<Product> findByName(String name);
}

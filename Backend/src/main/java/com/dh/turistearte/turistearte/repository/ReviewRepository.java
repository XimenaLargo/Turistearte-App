package com.dh.turistearte.turistearte.repository;

import com.dh.turistearte.turistearte.Entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ReviewRepository extends JpaRepository<Review , Long> {

    @Query("SELECT AVG(r.stars) FROM Review r WHERE r.product.idproduct = :productId")
    Double calculateAverageStarsByProductId(Long productId);
}

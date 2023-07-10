package com.dh.turistearte.turistearte.repository;

import com.dh.turistearte.turistearte.Entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image,Long> {
}

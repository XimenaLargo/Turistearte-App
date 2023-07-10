package com.dh.turistearte.turistearte.repository;

import com.dh.turistearte.turistearte.Entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository<City , Long> {
}

package com.dh.turistearte.turistearte.repository;

import com.dh.turistearte.turistearte.Entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoricalReservationsRepository extends JpaRepository<Reservation, Long> {
    @Query("SELECT r FROM Reservation r WHERE r.account.id = :accountId")
    List<Reservation> findByAccountId(@Param("accountId") Long accountId);
}

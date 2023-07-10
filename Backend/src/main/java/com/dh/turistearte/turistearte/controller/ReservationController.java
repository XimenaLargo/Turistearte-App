package com.dh.turistearte.turistearte.controller;

import com.dh.turistearte.turistearte.DTO.ReservationDTO;
import com.dh.turistearte.turistearte.Entity.Reservation;
import com.dh.turistearte.turistearte.Exceptions.BadRequestException;
import com.dh.turistearte.turistearte.Exceptions.ResourceNotFoundException;
import com.dh.turistearte.turistearte.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping
    public void save(@RequestBody Reservation reservation)
            throws BadRequestException, ResourceNotFoundException {
        reservationService.saveReservation(reservation);
    }

    @GetMapping
    public ResponseEntity<List<ReservationDTO>> getAll() throws ResourceNotFoundException {
        return ResponseEntity.ok(reservationService.getReservations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ReservationDTO>> getReservationById(@PathVariable Long id)
            throws ResourceNotFoundException {
        return ResponseEntity.ok(reservationService.getReservationById(id));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        reservationService.delete(id);
    }

    @GetMapping("/historical/{id}")
    public ResponseEntity<List<ReservationDTO>> getReservationsByAccount(@PathVariable Long id)
            throws ResourceNotFoundException {
        return ResponseEntity.ok(reservationService.getReservationsByAccount(id));
    }

    @GetMapping("/reserved-dates/{productId}")
    public List<LocalDate> getReservedDates(@PathVariable Long productId) {
        return reservationService.getReservedDates(productId);
    }
}

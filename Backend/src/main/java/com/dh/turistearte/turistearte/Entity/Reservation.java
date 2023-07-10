package com.dh.turistearte.turistearte.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "reservation")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = "idreservation")
    private Long idreservation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_idproduct", nullable = false)
    private Product product;

    @Column(name = "reservation_date")
    private LocalDate reservation_date;

    @Column(name = "state")
    private String state;

    @Column(name = "total_amount")
    private float total_amount;

    @Column(name = "phone_number")
    private Long phone_number;

    @Column(name = "DNI")
    private Long dni;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "account_idaccount" )
    private Account account;
}

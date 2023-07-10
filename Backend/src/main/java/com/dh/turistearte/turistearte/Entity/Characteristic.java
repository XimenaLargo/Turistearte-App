package com.dh.turistearte.turistearte.Entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "characteristic")
public class Characteristic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false,  name = "idcharacteristic")
    private Long idcharacteristic;

    @Column(name = "name")
    private String name;

}

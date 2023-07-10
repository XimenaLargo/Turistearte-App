package com.dh.turistearte.turistearte.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = "idreview")
    private Long idreview;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_idproduct" , nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "account_idaccount" , nullable = false)
    private Account account;

    @Column
    private String comment;

    @Column
    private Integer stars;

}

package com.dh.turistearte.turistearte.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = "idproduct")
    private Long idproduct;

    @Column(name = "cost")
    private Double cost;

    @Column(name = "description")
    private String description;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_idcity" , nullable = false)
    private City city;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
    private List<Reservation> reservations;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
    @JsonManagedReference
    private List<Image> url_img;

    @ManyToMany
    @JoinTable(name = "characteristic_has_product", joinColumns = @JoinColumn(name = "product_idproduct"), inverseJoinColumns = @JoinColumn(name = "characteristic_idcharacteristic"))
    private List<Characteristic> characteristics;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "category_idcategory" , nullable = false)
    private Category category;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
    private List<Review> reviews;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "latitude")
    private Double latitude;

}

package com.dh.turistearte.turistearte.Entity;

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
@Table(name = "Category")
public class Category {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(nullable = false , name = "idcategory")
    private Long idcategory;

    @Column(name = "name")
    private String name;

    @Column(name = "url_img")
    private String url_img;

    @Column(name = "description")
    private String description;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    @JsonManagedReference
    private List<Product> products;

}

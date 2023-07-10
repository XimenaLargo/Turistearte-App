package com.dh.turistearte.turistearte.DTO;
import com.dh.turistearte.turistearte.Entity.Characteristic;
import com.dh.turistearte.turistearte.Entity.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {

    private Long id;
    private String name;
    private String description;
    private Double cost;
    private String address;
    private CategoryDTO category;
    private List<Image> url_img;
    private List<Characteristic> characteristics;
    private List<ReviewDTO> reviews;
    private CityDTO city;
    private  Double longitude;
    private Double latitude;

}

package com.dh.turistearte.turistearte.Converters;
import com.dh.turistearte.turistearte.DTO.CategoryDTO;
import com.dh.turistearte.turistearte.DTO.CityDTO;
import com.dh.turistearte.turistearte.DTO.ProductDTO;
import com.dh.turistearte.turistearte.DTO.ReviewDTO;
import com.dh.turistearte.turistearte.Entity.Category;
import com.dh.turistearte.turistearte.Entity.City;
import com.dh.turistearte.turistearte.Entity.Product;
import com.dh.turistearte.turistearte.Entity.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Component
@Builder
@AllArgsConstructor
public class ProductToProductDTOConverter implements Converter<Product , ProductDTO> {
    private final Converter<Category , CategoryDTO> categoryConverter;
    private final Converter<Review , ReviewDTO> reviewConverter;
    private final Converter<City, CityDTO> cityConverter;
    @Override
    public ProductDTO convert(Product product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getIdproduct());
        productDTO.setName(product.getName());
        productDTO.setDescription(product.getDescription());
        productDTO.setCost(product.getCost());
        productDTO.setAddress(product.getAddress());
        productDTO.setCategory(categoryConverter.convert(product.getCategory()));
        productDTO.setUrl_img(product.getUrl_img());
        productDTO.setCharacteristics(product.getCharacteristics());
        if (product.getReviews() != null) {
            productDTO.setReviews(product.getReviews().stream()
                    .map(review -> reviewConverter.convert(review))
                    .collect(Collectors.toList()));
        } else {
            productDTO.setReviews(new ArrayList<>());
        }
        productDTO.setCity(cityConverter.convert(product.getCity()));
        productDTO.setLongitude(product.getLongitude());
        productDTO.setLatitude(product.getLatitude());
        return productDTO;
    }
}

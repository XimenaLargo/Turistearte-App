package com.dh.turistearte.turistearte.Converters;

import com.dh.turistearte.turistearte.DTO.CategoryDTO;
import com.dh.turistearte.turistearte.Entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
@Builder
@AllArgsConstructor
public class CategoryToCategoryDTOConverter implements Converter<Category , CategoryDTO> {

    @Override
    public CategoryDTO convert(Category category) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(category.getIdcategory());
        categoryDTO.setName(category.getName());
        categoryDTO.setDescription(category.getDescription());
        categoryDTO.setUrl_img(category.getUrl_img());
        return categoryDTO;
    }
}

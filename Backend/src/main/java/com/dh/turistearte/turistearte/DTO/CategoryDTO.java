package com.dh.turistearte.turistearte.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDTO {

    private Long id;
    private String name;
    private String description;
    private String url_img;
}

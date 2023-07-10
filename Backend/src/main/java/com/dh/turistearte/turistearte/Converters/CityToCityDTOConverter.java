package com.dh.turistearte.turistearte.Converters;

import com.dh.turistearte.turistearte.DTO.CityDTO;
import com.dh.turistearte.turistearte.Entity.City;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
@Builder
@AllArgsConstructor
public class CityToCityDTOConverter  implements Converter<City , CityDTO> {


    @Override
    public CityDTO convert(City city) {
        CityDTO cityDTO = new CityDTO();
        cityDTO.setId(city.getId());
        cityDTO.setName(city.getName());
        return cityDTO;
    }
}

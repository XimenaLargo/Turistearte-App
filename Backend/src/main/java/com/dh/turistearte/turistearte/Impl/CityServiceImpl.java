package com.dh.turistearte.turistearte.Impl;

import com.dh.turistearte.turistearte.DTO.CityDTO;
import com.dh.turistearte.turistearte.Entity.City;
import com.dh.turistearte.turistearte.Exceptions.BadRequestException;
import com.dh.turistearte.turistearte.Exceptions.ResourceNotFoundException;
import com.dh.turistearte.turistearte.repository.CityRepository;
import com.dh.turistearte.turistearte.service.CityService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CityServiceImpl implements CityService {

    private final CityRepository cityRepository;

    private final ConversionService conversionService;

    @Override
    public void createCity(City city) throws BadRequestException {
        cityRepository.save(city);
    }

    @Override
    public List<CityDTO> getCities() throws ResourceNotFoundException {
        List<City> citiesList = cityRepository.findAll();
        List<CityDTO> cityDTOS = new ArrayList<>();
        if (citiesList.size() > 0){
            for (City city : citiesList) {
                CityDTO cityDTO = conversionService.convert(city ,CityDTO.class);
                cityDTOS.add(cityDTO);
            }
            return cityDTOS;
        }
      else {
          throw new ResourceNotFoundException("No hay ciudades registradas");
        }
    }
}

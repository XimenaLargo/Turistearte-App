package com.dh.turistearte.turistearte.service;

import com.dh.turistearte.turistearte.DTO.CityDTO;
import com.dh.turistearte.turistearte.Entity.City;
import com.dh.turistearte.turistearte.Exceptions.BadRequestException;
import com.dh.turistearte.turistearte.Exceptions.ResourceNotFoundException;
import java.util.List;

public interface CityService {

    void createCity(City city) throws BadRequestException;

    List<CityDTO> getCities() throws ResourceNotFoundException;

}

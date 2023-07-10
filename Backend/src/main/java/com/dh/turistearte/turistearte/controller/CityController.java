package com.dh.turistearte.turistearte.controller;

import com.dh.turistearte.turistearte.DTO.CityDTO;
import com.dh.turistearte.turistearte.Entity.City;
import com.dh.turistearte.turistearte.Exceptions.BadRequestException;
import com.dh.turistearte.turistearte.Exceptions.ResourceNotFoundException;
import com.dh.turistearte.turistearte.service.CityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/cities")
public class CityController {

    private final CityService cityService;

    @PostMapping
    public void saveCity (@RequestBody City city) throws BadRequestException {
        cityService.createCity(city);
    }

    @GetMapping
    public ResponseEntity<List<CityDTO>> listCities() throws ResourceNotFoundException {
        return ResponseEntity.ok(cityService.getCities());
    }
}

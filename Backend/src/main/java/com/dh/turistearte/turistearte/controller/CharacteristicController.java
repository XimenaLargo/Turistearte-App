package com.dh.turistearte.turistearte.controller;

import com.dh.turistearte.turistearte.Entity.Characteristic;
import com.dh.turistearte.turistearte.service.CharacteristicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/characteristics")
public class CharacteristicController {
    @Autowired
    private CharacteristicService characteristicService;

    @PostMapping
    public ResponseEntity<Characteristic> save(@RequestBody Characteristic ch){
        return ResponseEntity.ok(characteristicService.saveCharacteristic(ch));
    }

    @GetMapping
    public ResponseEntity<List<Characteristic>> getAllCharacteristics(){
        return ResponseEntity.ok(characteristicService.getAllCharacteristics());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Characteristic>> getCharacteristicById(@PathVariable Long id){
        return ResponseEntity.ok(characteristicService.getCharacteristicById(id));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        characteristicService.deleteCharacteristic(id);
    }
}

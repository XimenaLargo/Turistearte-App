package com.dh.turistearte.turistearte.service;

import com.dh.turistearte.turistearte.Entity.Characteristic;
import com.dh.turistearte.turistearte.repository.CharacteristicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CharacteristicService {

    @Autowired
    private CharacteristicRepository characteristicRepository;

    public Characteristic saveCharacteristic (Characteristic ch){
        return characteristicRepository.save(ch);
    }

    public List<Characteristic> getAllCharacteristics(){
        return characteristicRepository.findAll();
    }

    public Optional<Characteristic> getCharacteristicById(Long id){
        return characteristicRepository.findById(id);
    }

    public void deleteCharacteristic (Long id){
        characteristicRepository.deleteById(id);
    }
}

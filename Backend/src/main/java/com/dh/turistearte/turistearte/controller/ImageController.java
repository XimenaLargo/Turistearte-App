package com.dh.turistearte.turistearte.controller;

import com.dh.turistearte.turistearte.DTO.ImageDTO;
import com.dh.turistearte.turistearte.Entity.Image;
import com.dh.turistearte.turistearte.Exceptions.BadRequestException;
import com.dh.turistearte.turistearte.Exceptions.ResourceNotFoundException;
import com.dh.turistearte.turistearte.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/images")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @PostMapping
    public ResponseEntity<ImageDTO> save(@RequestBody Image img) throws BadRequestException {
        return ResponseEntity.ok(imageService.saveImage(img));
    }
    @GetMapping
    public ResponseEntity<List<ImageDTO>> getAllImages() throws ResourceNotFoundException {
        return ResponseEntity.ok(imageService.getImages());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ImageDTO>> getImageById(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(imageService.getImageById(id));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        imageService.deleteImage(id);
    }

}

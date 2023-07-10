package com.dh.turistearte.turistearte.service;

import com.dh.turistearte.turistearte.DTO.ImageDTO;
import com.dh.turistearte.turistearte.Entity.Image;
import com.dh.turistearte.turistearte.Exceptions.BadRequestException;
import com.dh.turistearte.turistearte.Exceptions.ResourceNotFoundException;
import com.dh.turistearte.turistearte.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ConversionService conversionService;

    public ImageDTO saveImage(Image img) throws BadRequestException {
        if (img != null){
            Image savedImage =  imageRepository.save(img);
            return conversionService.convert(img , ImageDTO.class);
        }
       else {
           throw new BadRequestException("No se pudo registrar la imagen");
        }
    }

    public List<ImageDTO> getImages() throws ResourceNotFoundException {
        List<Image> images = imageRepository.findAll();
        List<ImageDTO> imageDTOS = new ArrayList<>();
        if (images.size()>0){
            for (Image image : images) {
                ImageDTO imageDTO = conversionService.convert(image , ImageDTO.class);
                imageDTOS.add(imageDTO);
            }
            return imageDTOS;
        }
        else {
            throw new ResourceNotFoundException("No hay imagenes registradas");
        }
    }

    public Optional<ImageDTO> getImageById(Long id) throws ResourceNotFoundException {
        Optional<Image> searchedImage = imageRepository.findById(id);
        if (searchedImage.isPresent()){
            return searchedImage.map(image -> conversionService.convert(image , ImageDTO.class));
        }
        else {
            throw new ResourceNotFoundException("La imagen no existe");
        }

    }

    public void deleteImage (Long id){
        imageRepository.deleteById(id);
    }

}

package com.dh.turistearte.turistearte.Converters;

import com.dh.turistearte.turistearte.DTO.ImageDTO;
import com.dh.turistearte.turistearte.Entity.Image;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;


@Component
public class ImageToImageDTOConverter implements Converter<Image , ImageDTO> {
    @Override
    public ImageDTO convert(Image img) {
        ImageDTO imageDTO = new ImageDTO();
        imageDTO.setId(img.getIdimg());
        imageDTO.setUrl_img(img.getUrl_img());
        return imageDTO;
    }
}

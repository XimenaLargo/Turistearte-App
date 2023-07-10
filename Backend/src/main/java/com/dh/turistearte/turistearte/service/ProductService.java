package com.dh.turistearte.turistearte.service;
import com.dh.turistearte.turistearte.DTO.ProductDTO;
import com.dh.turistearte.turistearte.Entity.Image;
import com.dh.turistearte.turistearte.Entity.Product;
import com.dh.turistearte.turistearte.Exceptions.BadRequestException;
import com.dh.turistearte.turistearte.Exceptions.ResourceNotFoundException;
import com.dh.turistearte.turistearte.repository.ImageRepository;
import com.dh.turistearte.turistearte.repository.ProductRepository;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.*;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ConversionService conversionService;

    @Autowired
    private AwsS3Service awsS3Service;

    public ProductDTO saveProduct(Product product, List<MultipartFile> imageFiles) throws BadRequestException {
        try {
            Product savedProduct = productRepository.save(product);
            List<Image> images = new ArrayList<>();
            for (MultipartFile imageFile : imageFiles) {
                awsS3Service.uploadFile(imageFile);
                String imageUrl = awsS3Service.generateImageUrl(imageFile.getOriginalFilename());

                Image image = new Image();
                image.setUrl_img(imageUrl);
                image.setProduct(savedProduct);

                imageRepository.save(image);
                images.add(image);
            }
            savedProduct.setUrl_img(images);
            productRepository.save(savedProduct);
            return conversionService.convert(savedProduct, ProductDTO.class);
        } catch (Exception e) {
            if (e.getCause() instanceof ConstraintViolationException ex && ex.getErrorCode() == 1062) {
                throw new BadRequestException("El nombre ya existe en la base de datos");
            } else {
                throw new BadRequestException("No se pudo realizar el registro" + e.getMessage());
            }
        }
    }

    public List<ProductDTO> getProducts() throws ResourceNotFoundException {
        List<Product> products = productRepository.findAll();
        List<ProductDTO> productDTOS = new ArrayList<>();
        if (products.size()>0){
            for (Product product : products) {
                ProductDTO productDTO = conversionService.convert(product , ProductDTO.class);
                productDTOS.add(productDTO);
            }
            return productDTOS;
        }
        else {
            throw new ResourceNotFoundException("No hay productos registrados");
        }
    }

    public Optional<ProductDTO> getProductsById(Long id) throws ResourceNotFoundException {
        Optional<Product> searchedProduct = productRepository.findById(id);
        if (searchedProduct.isPresent()){
            return searchedProduct.map(product -> conversionService.convert(product , ProductDTO.class));
        }
        else {
            throw new ResourceNotFoundException("El producto no existe");
        }
    }

    public void delete(Long id){
        productRepository.deleteById(id);
    }

}

package com.dh.turistearte.turistearte.service;

import com.dh.turistearte.turistearte.DTO.CategoryDTO;
import com.dh.turistearte.turistearte.DTO.ProductDTO;
import com.dh.turistearte.turistearte.Entity.Category;
import com.dh.turistearte.turistearte.Entity.Product;
import com.dh.turistearte.turistearte.Exceptions.BadRequestException;
import com.dh.turistearte.turistearte.Exceptions.ResourceNotFoundException;
import com.dh.turistearte.turistearte.repository.CategoryRepository;
import com.dh.turistearte.turistearte.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.*;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ConversionService conversionService;
    @Autowired
    private AwsS3Service awsS3Service;
    @Autowired
    private ImageRepository imageRepository;


    public CategoryDTO saveCategory(Category category , MultipartFile file) throws BadRequestException {
        try {
            Category savedCategory = categoryRepository.save(category);
            awsS3Service.uploadFile(file);
            String imageUrl = awsS3Service.generateImageUrl(file.getOriginalFilename());
            savedCategory.setUrl_img(imageUrl);
            categoryRepository.save(savedCategory);
            return conversionService.convert(savedCategory , CategoryDTO.class);
        }
        catch (Exception e){
            throw new BadRequestException("No se pudo crear la categoria");
        }
    }

    public List<CategoryDTO> getCategories() throws ResourceNotFoundException {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDTO> categoryDTOS = new ArrayList<>();
        if (categories.size()>0){
            for (Category category : categories) {
                CategoryDTO categoryDTO = conversionService.convert(category , CategoryDTO.class);
                categoryDTOS.add(categoryDTO);
            }
            return categoryDTOS;
        }
        else {
            throw new ResourceNotFoundException("No hay categorias registradas");
        }
    }

    public Optional<CategoryDTO> getCategoryById(Long id) throws BadRequestException {
        Optional<Category> searchedCategory = categoryRepository.findById(id);
        if (searchedCategory.isPresent()){
            return searchedCategory.map(category -> conversionService.convert(category , CategoryDTO.class));
        }else {
            throw new BadRequestException("La categoria no existe");
        }
    }

    public Set<ProductDTO> getProductsByCategory(Long id) throws ResourceNotFoundException {
        Set<Product> productsByCategory =  categoryRepository.findProductsByCategoryId(id);
        Set<ProductDTO> productDTOS = new HashSet<>();
        if (productsByCategory.size()>0){
            for (Product product : productsByCategory) {
                ProductDTO productDTO = conversionService.convert(product , ProductDTO.class);
                productDTOS.add(productDTO);
            }
            return productDTOS;
        }
        else {
            throw new ResourceNotFoundException("No hay productos en esta categoria");
        }
    }

    public void deleteCategory (Long id){
        categoryRepository.deleteById(id);
    }


}

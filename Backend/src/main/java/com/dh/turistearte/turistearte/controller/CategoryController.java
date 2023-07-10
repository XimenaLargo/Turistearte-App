package com.dh.turistearte.turistearte.controller;

import com.dh.turistearte.turistearte.DTO.CategoryDTO;
import com.dh.turistearte.turistearte.DTO.ProductDTO;
import com.dh.turistearte.turistearte.Entity.Category;
import com.dh.turistearte.turistearte.Exceptions.BadRequestException;
import com.dh.turistearte.turistearte.Exceptions.ResourceNotFoundException;
import com.dh.turistearte.turistearte.service.CategoryService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryDTO> save(  @RequestPart("category") String categoryJson,
                                              @RequestPart("url_img")  MultipartFile url_img) throws BadRequestException, JsonProcessingException {
        Category category = new ObjectMapper().readValue(categoryJson , Category.class);
        return ResponseEntity.ok(categoryService.saveCategory(category , url_img));
    }
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAll() throws ResourceNotFoundException {
        return ResponseEntity.ok(categoryService.getCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<CategoryDTO>> getCategoryById(@PathVariable Long id) throws BadRequestException {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @GetMapping("/{id}/products")
    public  Set<ProductDTO> getProductByCategory(@PathVariable Long id) throws ResourceNotFoundException {
        return categoryService.getProductsByCategory(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        categoryService.deleteCategory(id);
    }

}

package com.dh.turistearte.turistearte.controller;
import com.dh.turistearte.turistearte.DTO.ProductDTO;
import com.dh.turistearte.turistearte.Entity.Product;
import com.dh.turistearte.turistearte.Exceptions.BadRequestException;
import com.dh.turistearte.turistearte.Exceptions.ResourceNotFoundException;
import com.dh.turistearte.turistearte.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;
    @PostMapping
    public ResponseEntity<ProductDTO> save(
            @RequestPart("product") String productJson,
            @RequestPart("url_img") List<MultipartFile> url_img
    ) throws BadRequestException, JsonProcessingException {
        Product product = new ObjectMapper().readValue(productJson, Product.class);
        return ResponseEntity.ok(productService.saveProduct(product, url_img));
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAll() throws ResourceNotFoundException {
        return ResponseEntity.ok(productService.getProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ProductDTO>> getProductById(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(productService.getProductsById(id));
    }
    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        productService.delete(id);
    }


}

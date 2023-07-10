package com.dh.turistearte.turistearte.controller;

import com.dh.turistearte.turistearte.DTO.ReviewDTO;
import com.dh.turistearte.turistearte.Entity.Review;
import com.dh.turistearte.turistearte.Exceptions.BadRequestException;
import com.dh.turistearte.turistearte.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/reviews")

public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewDTO> saveReview(@RequestBody Review review) throws BadRequestException {
        return ResponseEntity.ok(reviewService.createReview(review));
    }

    @GetMapping("/{productId}/average-stars")
    public ResponseEntity<Double> getAverageStarsByProductId(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.calculateAverageStarsByProductId(productId));
    }

}

package com.dh.turistearte.turistearte.Impl;

import com.dh.turistearte.turistearte.DTO.ReviewDTO;
import com.dh.turistearte.turistearte.Entity.Review;
import com.dh.turistearte.turistearte.Exceptions.BadRequestException;
import com.dh.turistearte.turistearte.repository.ReviewRepository;
import com.dh.turistearte.turistearte.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ConversionService conversionService;

    @Override
    public ReviewDTO createReview(Review review) throws BadRequestException {
        if (review != null){
            reviewRepository.save(review);
            return conversionService.convert(review , ReviewDTO.class);
        }
        else {
            throw new BadRequestException("No se pudo realizar la reseña");
        }

    }
    @Override
    public Double calculateAverageStarsByProductId(Long productId) {
        Double averageReviews = reviewRepository.calculateAverageStarsByProductId(productId);
        if (averageReviews !=null){
            return reviewRepository.calculateAverageStarsByProductId(productId);
        }
       else {
           return 0.0;
        }
    }
}

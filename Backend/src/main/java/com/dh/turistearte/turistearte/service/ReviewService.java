package com.dh.turistearte.turistearte.service;

import com.dh.turistearte.turistearte.DTO.ReviewDTO;
import com.dh.turistearte.turistearte.Entity.Review;
import com.dh.turistearte.turistearte.Exceptions.BadRequestException;

import java.util.List;

public interface ReviewService {

    ReviewDTO createReview (Review review) throws BadRequestException;

   Double calculateAverageStarsByProductId(Long productId);

}

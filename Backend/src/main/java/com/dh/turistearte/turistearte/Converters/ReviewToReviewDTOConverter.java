package com.dh.turistearte.turistearte.Converters;

import com.dh.turistearte.turistearte.DTO.ReviewDTO;
import com.dh.turistearte.turistearte.Entity.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
@Builder
@AllArgsConstructor
public class ReviewToReviewDTOConverter implements Converter<Review , ReviewDTO> {

    @Override
    public ReviewDTO convert(Review review) {
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setId(review.getIdreview());
        reviewDTO.setComment(review.getComment());
        reviewDTO.setStars(review.getStars());
        return reviewDTO;
    }
}

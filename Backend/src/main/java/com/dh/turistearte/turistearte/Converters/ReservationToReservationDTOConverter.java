package com.dh.turistearte.turistearte.Converters;

import com.dh.turistearte.turistearte.DTO.ProductDTO;
import com.dh.turistearte.turistearte.DTO.ReservationDTO;
import com.dh.turistearte.turistearte.Entity.Product;
import com.dh.turistearte.turistearte.Entity.Reservation;
import org.springframework.core.convert.converter.Converter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.stereotype.Component;

@Component
@Builder
@AllArgsConstructor
public class ReservationToReservationDTOConverter implements Converter<Reservation, ReservationDTO>{

    private final Converter<Product , ProductDTO> productConverter;

    @Override
    public ReservationDTO convert(Reservation reservation) {
        ReservationDTO reservationDTO = new ReservationDTO();
        reservationDTO.setId(reservation.getIdreservation());
        reservationDTO.setReservation_date(reservation.getReservation_date());
        reservationDTO.setTotal_amount(reservation.getTotal_amount());
        reservationDTO.setDni(reservation.getDni());
        reservationDTO.setPhone_number(reservation.getPhone_number());
        if (reservation.getProduct() != null && reservation.getProduct().getCategory() != null){
            reservationDTO.setTour(productConverter.convert(reservation.getProduct()));
        }

        return reservationDTO;
    }
}

package com.dh.turistearte.turistearte.service;

import com.dh.turistearte.turistearte.DTO.AccountDTO;
import com.dh.turistearte.turistearte.DTO.ProductDTO;

import com.dh.turistearte.turistearte.DTO.ReservationDTO;
import com.dh.turistearte.turistearte.Entity.Reservation;
import com.dh.turistearte.turistearte.Exceptions.BadRequestException;
import com.dh.turistearte.turistearte.Exceptions.ResourceNotFoundException;
import com.dh.turistearte.turistearte.repository.HistoricalReservationsRepository;
import com.dh.turistearte.turistearte.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class ReservationService {
    private final HistoricalReservationsRepository historicalReservationsRepository;
    private final ReservationRepository reservationRepository;
    private final ConversionService conversionService;
    private final AccountService accountService;
    private final ProductService productService;
    private final EmailService emailService;

    public void saveReservation(Reservation reservation)
            throws BadRequestException, ResourceNotFoundException {
        Optional<AccountDTO> account = accountService.getUSerById(reservation.getAccount().getId());
        Optional<ProductDTO> product = productService.getProductsById(reservation.getProduct().getIdproduct());
        if (account.isPresent() && product.isPresent()) {
            reservationRepository.save(reservation);
            emailService.sendMail(account.get().getEmail(), "Confirmacion de reserva", reservationMessage(
                    account.get().getName(), product.get().getName(), reservation.getReservation_date(), product.get().getAddress() , product.get().getCost()));
            conversionService.convert(reservation, ReservationDTO.class);
        } else {
            throw new BadRequestException("No se pudo realizar la reserva");
        }
    }

    public List<ReservationDTO> getReservations() throws ResourceNotFoundException {
        List<Reservation> reservations = reservationRepository.findAll();
        List<ReservationDTO> reservationDTOS = new ArrayList<>();
        if (reservations.size() > 0) {
            for (Reservation reservation : reservations) {
                ReservationDTO reservationDTO = conversionService.convert(reservation, ReservationDTO.class);
                reservationDTOS.add(reservationDTO);
            }
            return reservationDTOS;
        } else {
            throw new ResourceNotFoundException("No hay reservas registradas");
        }
    }

    public Optional<ReservationDTO> getReservationById(Long id) throws ResourceNotFoundException {
        Optional<Reservation> searchedReservation = reservationRepository.findById(id);
        if (searchedReservation.isPresent()) {
            return searchedReservation.map(reservation -> conversionService.convert(reservation, ReservationDTO.class));

        } else {
            throw new ResourceNotFoundException("La reserva con ese id no existe");
        }
    }

    public List<ReservationDTO> getReservationsByAccount(Long id) throws ResourceNotFoundException {
        List<Reservation> historicalReservations = historicalReservationsRepository.findByAccountId(id);
        List<ReservationDTO> historicalReservationDTOS = new ArrayList<>();
        if (historicalReservations.size() > 0) {
            for (Reservation reservation : historicalReservations) {
                ReservationDTO reservationDTO = conversionService.convert(reservation, ReservationDTO.class);
                historicalReservationDTOS.add(reservationDTO);
            }
            return historicalReservationDTOS;
        } else {
            throw new ResourceNotFoundException("No hay reservas registradas para esa cuenta");
        }
    }

    public void delete(Long id) {
        reservationRepository.deleteById(id);
    }

    public List<LocalDate> getReservedDates(Long productId) {
        List<Reservation> reservations = reservationRepository.findByProductId(productId);

        List<LocalDate> reservedDates = new ArrayList<>();
        for (Reservation reservation : reservations) {
            reservedDates.add(reservation.getReservation_date());
        }

        return reservedDates;
    }

    public String reservationMessage(String name, String tour, LocalDate fecha , String addres , Double cost) {
        return "<html  lang=\"en\">" +
                "<head>" +
                "<meta charset=\"UTF-8\" />" +
                "<style>" +
                "body { font-family: Arial, sans-serif; font-weigh:bold;}" +
                "th,td {border: 1px solid #dddddd;\n" +
                "  text-align: center;\n" +
                "  padding: 8px;}" +
                "</style>" +
                "</head>" +
                "<body style='background-color: #d7ebf9; padding: 50px'>" +
                "<div style='display: flex; justify-content: center; background-color:#0E7E9C;'>" +
                "<h1 style='color: #DBDBDB; font-size: 2rem; text-align: center; height: 10%; width: 100%'> " + name
                + " Tu reserva ha sido creada exitosamente</h1>" +
                "</div>" +
                "<p style='font-size:1.5rem; text-align: center; color:#08404F;line-height: 1.5;'>Gracias por elegirnos para vivir esta experiencia! \n</p>"
                +
                "\n" +
                "<p style='font-size:1.5rem; text-align: center; color:#08404F;line-height: 1.5;'>Datos de tu reserva</p>\n" +
                " <table style='border-collapse: collapse;\n" +
                "  border-spacing: 0;\n" +
                "  display: table;\n" +
                "  border: 1px solid #ccc;\n" +
                "  margin: 20px auto;'>\n" +
                "        <thead>\n" +
                "           <tr>" +
                "            <th>Nombre de la experiencia</th>\n" +
                "            <th>Fecha de reserva</th>\n" +
                "             <th>Direccion</th>\n" +
                "             <th>Costo de la experiencia</th>\n" +
                "            </tr>" +
                "        </thead>\n" +
                "        <tbody>\n" +
                "           <tr>" +
                "            <td>" + tour + "</td>\n" +
                "            <td>" + fecha + "</td>\n" +
                "            <td>" + addres + "</td>\n" +
                "            <td>" + "$ " +cost + "</td>\n" +
                "           </tr>" +
                "        </tbody>\n" +
                "    </table>" +
                "</body>" +
                "</html>";
    }

}

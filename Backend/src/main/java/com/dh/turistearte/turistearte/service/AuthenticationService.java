package com.dh.turistearte.turistearte.service;
import com.dh.turistearte.turistearte.DTO.AuthenticationResponse;
import com.dh.turistearte.turistearte.DTO.LoginRequest;
import com.dh.turistearte.turistearte.DTO.SingUpRequest;
import com.dh.turistearte.turistearte.Entity.Account;
import com.dh.turistearte.turistearte.Entity.ConfirmationToken;
import com.dh.turistearte.turistearte.Entity.UserRole;
import com.dh.turistearte.turistearte.Exceptions.BadRequestException;
import com.dh.turistearte.turistearte.jwt.JwtService;
import com.dh.turistearte.turistearte.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Log4j2
public class AuthenticationService {

    private final AccountService accountService;
    private final AccountRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final ConfirmationTokenService confirmationTokenService;

    public AuthenticationResponse register(SingUpRequest request) throws BadRequestException {

        String token = accountService.saveUser(
                new Account(
                        request.getName(),
                        request.getSurname(),
                        request.getEmail(),
                        request.getPassword(),
                        UserRole.ROLE_USER
                )
        );

        String link = "http://ec2-13-59-38-102.us-east-2.compute.amazonaws.com:8080/api/auth/confirm/" + token;

            log.info("enviando email a " + request.getEmail());
            emailService.sendMail(request.getEmail(),
                    "Turistearte Validación de Cuenta",
                    messageBody(request.getName() , link ));
            return AuthenticationResponse.builder()
                    .token(token)
                    .build();

    }

    public String messageBody(String name , String link){
        String logo = "https://turistearte-img.s3.us-east-2.amazonaws.com/logoTuristearte.png";
        return
        "<html  lang=\"en\">" +
        "<head>" +
                "<meta charset=\"UTF-8\" />" +
                "<style>" +
                "body { font-family: Arial, sans-serif; font-weigh:bold;}" +
                "</style>" +
        "</head>" +
        "<body style='background-color: #d7ebf9; padding: 50px'>"  +
                "<div style='display: flex; justify-content: center; background-color:#0E7E9C;'>"+
                "<img src=\"" + logo +"\" alt='logoTuristearte' style=' height: 40px; margin-top:20px; margin-right: 50px;' />" +
                "<h1 style='color: #DBDBDB; font-size: 30px; text-align: center; height: 50px; width: 100%'>Valida tu cuenta " +  name + "</h1>" +
                "</div>"+
                "<p style='font-size: 20px; text-align: center; color:#08404F;line-height: 1.5;'>Tu cuenta ha sido creada exitosamente, ¡Bienvenidx a Turistearte! \n</p>" +
                "\n" +
                "<p style='font-size: 16px; text-align: center; color:#08404F; line-height: 1.5; margin-top:50px'>Falta un solo paso, validar tu dirección de correo electrónico.</p>" +
                "\n" +
                "<p style='font-size: 16px; text-align: center; color:#08404F; line-height: 1.5; margin-top:80px;'>Por favor,haz click en validar cuenta: </p>"+
                "\n" +
                "<div style='text-align: center;'>" +
                "<a href=\"" + link + "\" style='font-size: 16px; background-color: #B7FF87; color:#08404F; margin-bottom:80px; border-radius: 8px; font-family: inherit; cursor: pointer; text-decoration: none; display: inline-block; padding: 10px 20px;'>Validar cuenta</a>" +
                "</div>" +
         "</body>" +
        "</html>";
    }

    @Transactional
    public void confirmToken(String token) throws BadRequestException {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        LocalDateTime confirmationValue = LocalDateTime.of(9999, 12, 31, 23, 59);

        if (!confirmationToken.getConfirmedAt().equals(confirmationValue)){
            throw new BadRequestException("El token ya ha sido validado");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (confirmationToken.getConfirmedAt().isBefore(expiredAt) && !confirmationToken.getConfirmedAt().equals(confirmationValue)){
            throw new BadRequestException("El token ha expirado");
        }

        confirmationTokenService.setConfirmedAt(token);
        accountService.enableAppUser(
                confirmationToken.getAppUser().getEmail()
        );
    }

    public AuthenticationResponse authenticate(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findUserByEmail(request.getEmail())
                .orElseThrow();
        var jwtoken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtoken)
                .build();
    }
}

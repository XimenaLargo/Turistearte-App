package com.dh.turistearte.turistearte.controller;

import com.dh.turistearte.turistearte.DTO.AuthenticationResponse;
import com.dh.turistearte.turistearte.DTO.LoginRequest;
import com.dh.turistearte.turistearte.DTO.SingUpRequest;
import com.dh.turistearte.turistearte.Exceptions.BadRequestException;
import com.dh.turistearte.turistearte.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> singUp(@RequestBody SingUpRequest request) throws BadRequestException {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest request){
        return ResponseEntity.ok(service.authenticate(request));
    }

    @GetMapping("/confirm/{token}")
    public RedirectView confirmToken(@PathVariable String token) {
        String URL_BASE = "http://localhost:5173";
        try {
            service.confirmToken(token);

            return new RedirectView(URL_BASE +"/EmailConfirmation");
        } catch (BadRequestException e) {
            return new RedirectView(URL_BASE+"/Error");
        }
    }

}

package com.dh.turistearte.turistearte.Impl;

import com.dh.turistearte.turistearte.Entity.ConfirmationToken;
import com.dh.turistearte.turistearte.repository.ConfirmationTokenRepository;
import com.dh.turistearte.turistearte.service.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ConfirmationTokenServiceImpl implements ConfirmationTokenService {

    private ConfirmationTokenRepository tokenRepository;

    @Override
   public void saveConfirmationToken(ConfirmationToken token) {
        tokenRepository.save(token);
    }

    @Override
    public Optional<ConfirmationToken> getToken(String token) {
        return tokenRepository.findByToken(token);
    }

    @Override
    public int setConfirmedAt(String token) {
        return tokenRepository.updateConfirmedAt(
                token, LocalDateTime.now());
    }
}


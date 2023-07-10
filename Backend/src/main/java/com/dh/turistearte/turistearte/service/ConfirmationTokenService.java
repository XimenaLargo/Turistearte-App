package com.dh.turistearte.turistearte.service;

import com.dh.turistearte.turistearte.Entity.ConfirmationToken;

import java.util.Optional;

public interface ConfirmationTokenService {

    void saveConfirmationToken(ConfirmationToken token);
    Optional<ConfirmationToken> getToken(String token);
    int setConfirmedAt(String token);

}

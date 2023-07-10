package com.dh.turistearte.turistearte.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SingUpRequest {

    private String name;
    private String surname;
    private String email;
    private String password;
}

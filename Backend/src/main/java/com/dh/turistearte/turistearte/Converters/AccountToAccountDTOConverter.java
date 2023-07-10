package com.dh.turistearte.turistearte.Converters;

import com.dh.turistearte.turistearte.DTO.AccountDTO;
import com.dh.turistearte.turistearte.Entity.Account;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class AccountToAccountDTOConverter implements Converter<Account, AccountDTO> {

    @Override
    public AccountDTO convert(Account account) {
        AccountDTO accountDTO = new AccountDTO();
        accountDTO.setId(account.getId());
        accountDTO.setName(account.getName());
        accountDTO.setSurname(account.getSurname());
        accountDTO.setEmail(account.getEmail());
        accountDTO.setRole(account.getRole().name());
        return accountDTO;
    }
    }
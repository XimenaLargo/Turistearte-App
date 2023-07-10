package com.dh.turistearte.turistearte.service;

import com.amazonaws.services.alexaforbusiness.model.NotFoundException;
import com.dh.turistearte.turistearte.DTO.AccountDTO;
import com.dh.turistearte.turistearte.Entity.Account;
import com.dh.turistearte.turistearte.Entity.ConfirmationToken;
import com.dh.turistearte.turistearte.Entity.UserRole;
import com.dh.turistearte.turistearte.Exceptions.BadRequestException;
import com.dh.turistearte.turistearte.Exceptions.ResourceNotFoundException;
import com.dh.turistearte.turistearte.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.convert.ConversionService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Log4j2
@Service
@RequiredArgsConstructor
public class AccountService implements UserDetailsService {
    private final AccountRepository accountRepository;
    private final ConversionService conversionService;
    private final PasswordEncoder passwordEncoder;
    private final ConfirmationTokenService confirmationTokenService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> searchedUser = accountRepository.findUserByEmail(username);
        if (searchedUser.isPresent()) {
            log.info("Usuario existe");
            return new Account(searchedUser.get().getId(),searchedUser.get().getName(), searchedUser.get().getSurname() , searchedUser.get().getUsername() , searchedUser.get().getRole());
        }
        else {
            log.error("Usuario no existe");
            throw new UsernameNotFoundException("El usuario no existe.");
        }

    }

    public String saveUser(Account account) throws BadRequestException {
        boolean userExists = accountRepository
                .findUserByEmail(account.getEmail())
                .isPresent();
        if (userExists) {
            throw new IllegalStateException("El usuario ya se encuentra registrado en nuestra página");
        }
            try {
                var user = Account.builder()
                        .name(account.getName())
                        .surname(account.getSurname())
                        .email(account.getEmail())
                        .password(passwordEncoder.encode(account.getPassword()))
                        .enabled(false)
                        .role(UserRole.ROLE_USER)
                        .build();
                accountRepository.save(user);
                String token = UUID.randomUUID().toString();
                ConfirmationToken confirmationToken = new ConfirmationToken(
                        token,
                        LocalDateTime.now(),
                        LocalDateTime.now().plusMinutes(60),
                        LocalDateTime.of(9999, 12, 31, 23, 59),
                        user
                );
                confirmationTokenService.saveConfirmationToken(confirmationToken);

                return token;
        }
        catch (Exception e){
                throw new BadRequestException("No se pudo realizar el registro");
        }
    }

    public void enableAppUser(String email) {
        accountRepository.enableAppUser(email);
    }

    public List<AccountDTO> getUsers() throws ResourceNotFoundException {
        List<Account> accounts = accountRepository.findAll();
        List<AccountDTO> accountDTOs = new ArrayList<>();
        if (accounts.size()>0){
            for (Account account : accounts) {
                AccountDTO accountDTO = conversionService.convert(account, AccountDTO.class);
                accountDTOs.add(accountDTO);
            }
            return accountDTOs;
        }
        else {
            throw new ResourceNotFoundException("No hay usuarios registrados");
        }
    }
    public Optional<AccountDTO> getUSerById(Long id) throws ResourceNotFoundException {
        Optional<Account> searchedAccount = accountRepository.findById(id);
        if (searchedAccount.isPresent()){
            return searchedAccount.map(account -> conversionService.convert(account, AccountDTO.class));
        }
        else {
            throw new ResourceNotFoundException("El usuario no existe");
        }
    }

    public void deleteUSer (Long id){
        Account usuario = accountRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Usuario no encontrado"));
        usuario.getConfirmationTokens().clear();
        accountRepository.delete(usuario);
    }

    public void updateRole(Long accountId, UserRole newRole) throws ResourceNotFoundException {
        Optional<Account> optionalAccount = accountRepository.findById(accountId);
        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            account.setRole(newRole);
            accountRepository.save(account);
        } else {
            throw new ResourceNotFoundException("El usuario no existe");
        }
    }

}

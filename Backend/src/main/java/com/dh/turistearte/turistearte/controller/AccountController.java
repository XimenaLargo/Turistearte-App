package com.dh.turistearte.turistearte.controller;

import com.dh.turistearte.turistearte.DTO.AccountDTO;
import com.dh.turistearte.turistearte.Entity.Account;
import com.dh.turistearte.turistearte.Entity.UserRole;
import com.dh.turistearte.turistearte.Exceptions.BadRequestException;
import com.dh.turistearte.turistearte.Exceptions.ResourceNotFoundException;
import com.dh.turistearte.turistearte.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private ConversionService conversionService;

    @PostMapping
    public ResponseEntity<String>save(@RequestBody Account account) throws BadRequestException {
        return ResponseEntity.ok(accountService.saveUser(account));
    }

    @GetMapping
    public ResponseEntity<List<AccountDTO>> getAll() throws ResourceNotFoundException {
        return ResponseEntity.ok(accountService.getUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<AccountDTO>> getUserById(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(accountService.getUSerById(id));
    }

    @GetMapping("/{email}/avatar")
    public ResponseEntity<AccountDTO> getUserByEmail(@PathVariable String email) {
        Account searchedUser = (Account) accountService.loadUserByUsername(email);
        return ResponseEntity.ok(conversionService.convert(searchedUser , AccountDTO.class));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        accountService.deleteUSer(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> changeUserRole (@PathVariable Long id,
                                                  @RequestParam UserRole role) throws ResourceNotFoundException {
        accountService.updateRole(id, role);
        return ResponseEntity.ok("Role updated successfully");
    }

}

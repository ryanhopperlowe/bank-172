package com.example.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bank.dao.AccountRepository;
import com.example.bank.dao.CustomerRepository;
import com.example.bank.domain.Account;
import com.example.bank.domain.Customer;
import com.example.bank.dto.LoginDto;
import com.example.bank.dto.PermissionDto;
import com.example.bank.exception.AccountNumberNotFoundException;
import com.example.bank.exception.CustomerIdNotFoundException;
import com.example.bank.exception.InvalidLoginException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	CustomerRepository customerRepo;
	
	@Autowired
	AccountRepository accountRepo;
	
	@PostMapping(value = "/login")
	public Customer login(@RequestBody final LoginDto credentials) {
		return customerRepo.findByUsernameAndPin(credentials.getUsername(), credentials.getPin())
				.orElseThrow(() -> new InvalidLoginException());
	}
	
	@PostMapping(value = "/permissions/customer/")
	public boolean checkCustomerPermissions(@RequestBody final PermissionDto ids) {
		Long	sourceId = ids.getSourceId(), 
				targetId = ids.getTargetId();
		
		Customer source = customerRepo.findById(sourceId)
				.orElseThrow(() -> new CustomerIdNotFoundException(sourceId));
		
		if (source.getRole() == Customer.ADMIN) 
			return true;
		
		Customer target = customerRepo.findById(targetId)
				.orElseThrow(() -> new CustomerIdNotFoundException(targetId));
		
		return source.getId() == target.getId();
	}
	
	@PostMapping(value = "/permissions/account")
	public boolean checkAccountPermissions(@RequestBody final PermissionDto ids) {
		Long 	sourceId = ids.getSourceId(),
				targetId = ids.getTargetId(); 
		
		Customer source = customerRepo.findById(sourceId)
				.orElseThrow(() -> new CustomerIdNotFoundException(sourceId));
		
		if (source.getRole() == Customer.ADMIN)
			return true;
		
		Account target = accountRepo.findById(targetId)
				.orElseThrow(() -> new AccountNumberNotFoundException(targetId));
		
		return source.getId() == target.getNumber();
	}

}

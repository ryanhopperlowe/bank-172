package com.example.bank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bank.dao.AccountRepository;
import com.example.bank.dao.CustomerRepository;
import com.example.bank.domain.Account;
import com.example.bank.domain.Customer;
import com.example.bank.dto.TransactionDto;
import com.example.bank.exception.AccountNumberNotFoundException;
import com.example.bank.exception.CustomerIdNotFoundException;

@RestController
@RequestMapping(value = "/api/accounts")
public class AccountController {
	
	@Autowired
	private AccountRepository accountRepo;
	
	@Autowired
	private CustomerRepository customerRepo;
	
	@GetMapping(value = "")
	public List<Account> getAll(@RequestBody final TransactionDto dto) {
		Customer user = this.findCustomer(dto.getUserId());
		if (user.getRole() != Customer.ADMIN)
			throw new RuntimeException("Only administrators can access all account information");
		return accountRepo.findAll();
	}
	
	@GetMapping(value = "/for/{id}")
	public List<Account> getCustomerAccounts(@PathVariable Long id) {
		return accountRepo.findByOwnerId(id);
	}
	
	@GetMapping(value = "/{number}")
	public Account getOne(@RequestBody final TransactionDto dto, @PathVariable Long number) {
		if (!this.userHasAccess(number, dto.getUserId()))
			throw new RuntimeException("User " + dto.getUserId() + " does not have access to Account " + number);
		
		return this.findAccount(number);
	}
	
	@PostMapping(value = "/open")
	public Account add(@RequestBody final Account account) {
		Customer owner = this.findCustomer(account.getOwnerId());
		
		account.setOwner(owner);
		account.setOwnerId(owner.getId());
		
		return accountRepo.save(account);
	}
	
	@PutMapping(value = "/reopen/{number}")
	public Account reopen(@RequestBody final TransactionDto dto, @PathVariable Long number) {
		if (!this.userHasAccess(number, dto.getUserId()))
			throw new RuntimeException("User " + dto.getUserId() + " does not have permission to close Account " + number);
		
		Account account = this.findAccount(number);
		if (account.getStatus() != Account.INACTIVE) 
			throw new RuntimeException("Account is already active");
		
		account.setStatus(Account.ACTIVE);
		return accountRepo.save(account);
	}
	
	@PutMapping(value = "/close/{number}")
	public Account close(@RequestBody final TransactionDto dto, @PathVariable Long number) {
		if (!this.userHasAccess(number, dto.getUserId()))
			throw new RuntimeException("User " + dto.getUserId() + " does not have permission to reopen Account " + number);
		
		Account account = this.findActiveAccount(number);
		account.setStatus(Account.INACTIVE);
		account.setAmount(0.00);
		return accountRepo.save(account);
	}
	
	@PutMapping(value = "/deposit/{number}")
	public Account deposit(@RequestBody final TransactionDto transaction, @PathVariable Long number) {
		Double amount = transaction.getAmount();
		
		if (amount < 0)
			throw new RuntimeException("Amount cannot be negative");

		Account account = this.findActiveAccount(number);
		account.setAmount(account.getAmount() + amount);
		return accountRepo.save(account);
	}
	
	@PutMapping(value = "/withdraw/{number}")
	public Account withdraw(@RequestBody final TransactionDto transaction, @PathVariable Long number) {
		Customer user = this.findCustomer(transaction.getUserId());
		
		if (transaction.getAmount() < 0) 
			throw new RuntimeException("Amount cannot be negative");

		Account account = this.findActiveAccount(number);
			
		if (!this.userHasAccess(account, user))
			throw new RuntimeException("User " + user.getId() + " does not have permission to withdraw from Account " + number);
			
		if (!(account.getAmount() >= transaction.getAmount()))
			throw new RuntimeException("Account " + number + " does not have enough funds");
		
		account.setAmount(account.getAmount() - transaction.getAmount());
		return accountRepo.save(account);
	}
	
	@PostMapping(value = "/transfer")
	public Account transfer(@RequestBody final TransactionDto transaction) {
		Long sourceNumber = transaction.getSource();		
		Long targetNumber = this.findActiveAccount(transaction.getTarget()).getNumber();
		
		if (sourceNumber == targetNumber) throw new RuntimeException("Source and destination account numbers cannot match");
		
		Account ret = this.withdraw(transaction, sourceNumber);
		this.deposit(transaction, targetNumber);
		return ret;
	}
	
	public Account findAccount(Long number) {
		return accountRepo.findById(number)
				.orElseThrow(() -> new AccountNumberNotFoundException(number));
	}
	
	public Customer findCustomer(Long id) {
		return customerRepo.findById(id)
				.orElseThrow(() -> new CustomerIdNotFoundException(id));
	}
	
	public Account findActiveAccount(Long number) {
		return accountRepo.findActiveAccountByNumber(number)
				.orElseThrow(() -> new AccountNumberNotFoundException(number));
	}
	
	public boolean userHasAccess(Account account, Customer user) {
		 return user.getId() == account.getOwnerId() || user.getRole() == Customer.ADMIN;
	}
	
	public boolean userHasAccess(Long accNum, Long userId) {
		Customer user = this.findCustomer(userId);
		Account account = this.findAccount(accNum);
		return this.userHasAccess(account, user);
	}
	
}

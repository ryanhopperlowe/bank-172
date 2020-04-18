package com.example.bank.exception;

public class AccountNumberNotFoundException extends RuntimeException {
	public AccountNumberNotFoundException(Long number) {
		super("Account number " + number + " was not found or is inactive");
	}
}

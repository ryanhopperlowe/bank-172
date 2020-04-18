package com.example.bank.exception;

public class CustomerIdNotFoundException extends RuntimeException {
	public CustomerIdNotFoundException(Long id) {
		super("Could not find Customer with id: " + id);
	}
}

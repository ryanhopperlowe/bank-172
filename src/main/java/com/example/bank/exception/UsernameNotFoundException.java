package com.example.bank.exception;

public class UsernameNotFoundException extends RuntimeException {
	public UsernameNotFoundException() {
		super("Username is already in use");
	}
}

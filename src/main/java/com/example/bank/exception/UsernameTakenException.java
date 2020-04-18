package com.example.bank.exception;

public class UsernameTakenException extends RuntimeException {
	public UsernameTakenException() {
		super("Username is already in use");
	}
}

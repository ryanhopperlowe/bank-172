package com.example.bank.exception;

public class InvalidLoginException extends RuntimeException {
	public InvalidLoginException() {
		super("Invalid Username/Pin Combination");
	}
}

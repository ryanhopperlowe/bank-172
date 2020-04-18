package com.example.bank.exception;

public class MismatchedPinsException extends RuntimeException {
	public MismatchedPinsException() {
		super("Pins do not match");
	}
}

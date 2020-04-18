package com.example.bank.dto;

public class LoginDto {
	private String username;
	private Integer pin;
	
	
	public Integer getPin() {
		return pin;
	}
	
	public void setPin(Integer pin) {
		this.pin = pin;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
}

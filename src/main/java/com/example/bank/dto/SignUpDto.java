package com.example.bank.dto;

public class SignUpDto extends LoginDto {
	
	private String username;
	private Integer pin;
	private Integer confirmPin;
	
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public Integer getPin() {
		return pin;
	}
	
	public void setPin(Integer pin) {
		this.pin = pin;
	}
	
	public Integer getConfirmPin() {
		return confirmPin;
	}
	
	public void setConfirmPin(Integer confirmPin) {
		this.confirmPin = confirmPin;
	}
}

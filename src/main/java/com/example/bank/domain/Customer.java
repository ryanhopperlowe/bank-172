package com.example.bank.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Entity
public class Customer {
	
	public static final Short ADMIN = 1;
	public static final Short USER = 0;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
		
	@Column(unique = true)
	@NotNull(message = "Username is required")
	private String username;
	
	@NotNull(message = "Pin is required!")
	private Integer pin;
	
	@Min(0)
	@Max(1)
	@Column(columnDefinition = "Tinyint unsigned not null default 0, check(role in (0, 1))")
	private Short role;
	
	public Customer() {}
	
	public Customer(String username, Integer pin) {
		this.username = username;
		this.pin = pin;
		this.role = USER;
	}
	
	public Customer(String username, Integer pin, Short role) {
		this.username = username;
		this.pin = pin;
		this.role = role;
	}
		
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}

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

	public Short getRole() {
		return role;
	}

	public void setRole(Short role) {
		this.role = role;
	}
	
	public String toString() {
		String str = "Customer[id = " + this.id + ", username = "
				+ this.username + ", pin = " + this.pin
				+ ", role = " + this.role;
		return str;
	}
}

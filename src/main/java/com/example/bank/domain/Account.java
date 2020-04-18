package com.example.bank.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;



@Entity
public class Account {
	
	public static final Character ACTIVE = 'A';
	public static final Character INACTIVE = 'I';
	public static final String CHECKING = "Checking";
	public static final String SAVINGS = "Savings";
	public static final String BROKERAGE = "Brokerage";
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long number;
	
	@ManyToOne(targetEntity = Customer.class)
	@JoinColumn(name = "owner_id", foreignKey = @ForeignKey(name = "ownerId_fk"))
	private Customer owner;
	
	@Column(name = "owner_id", updatable = false, insertable = false)
	private Long ownerId;
	
	@Column(columnDefinition = "Decimal(10,2) default 0.00 CHECK (amount > 0)")
	private Double amount = 0.00;
	
	@Column(columnDefinition = "VARCHAR(1) default 'A' CHECK (status IN ('A', 'I'))")
	private Character status = 'A';
	
	@Column(columnDefinition = "VARCHAR(12) default 'Checking' CHECK (type IN ('Checking', 'Savings', 'Brokerage'))")
	private String type = CHECKING;


	public Long getNumber() {
		return number;
	}


	public void setNumber(Long number) {
		this.number = number;
	}


	public Customer getOwner() {
		return owner;
	}


	public void setOwner(Customer owner) {
		this.owner = owner;
	}


	public Long getOwnerId() {
		return ownerId;
	}


	public void setOwnerId(Long ownerId) {
		this.ownerId = ownerId;
	}


	public Double getAmount() {
		return amount;
	}


	public void setAmount(Double amount) {
		this.amount = amount;
	}


	public Character getStatus() {
		return status;
	}


	public void setStatus(Character status) {
		this.status = status;
	}


	public String getType() {
		return type;
	}


	public void setType(String type) {
		
		this.type = type;
	}
	
	

}

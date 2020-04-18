package com.example.bank.dto;

public class TransactionDto {
	private Double 				amount;
	private Long 				source = null, 
								target = null, 
								userId = null;
	
	
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public Long getSource() {
		return source;
	}
	public void setSource(Long source) {
		this.source = source;
	}
	public Long getTarget() {
		return target;
	}
	public void setTarget(Long target) {
		this.target = target;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	
}

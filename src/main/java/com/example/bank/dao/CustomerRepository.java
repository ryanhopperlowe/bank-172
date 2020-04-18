package com.example.bank.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.bank.domain.Customer;

@RepositoryRestResource
public interface CustomerRepository extends JpaRepository<Customer, Long> {
	public Optional<Customer> findByUsernameAndPin(String username, Integer pin);
	public Optional<Customer> findByUsername(String username);

}

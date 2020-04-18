package com.example.bank.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.bank.domain.Account;

@RepositoryRestResource
public interface AccountRepository extends JpaRepository<Account, Long> {
	@Query("select a from Account a where a.number = ?1 and a.status = 'A'")
	public Optional<Account> findActiveAccountByNumber(Long number);
	
	public List<Account> findByOwnerId(Long ownerId);
}

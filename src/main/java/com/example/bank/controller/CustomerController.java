package com.example.bank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bank.dao.CustomerRepository;
import com.example.bank.domain.Customer;
import com.example.bank.dto.LoginDto;
import com.example.bank.exception.CustomerIdNotFoundException;
import com.example.bank.exception.InvalidLoginException;
import com.example.bank.exception.UsernameNotFoundException;
import com.example.bank.exception.UsernameTakenException;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
	
	@Autowired
	private CustomerRepository repo;
	
	@GetMapping(value = "")
	public List<Customer> getAll() {
		return repo.findAll();
	}
	
	@GetMapping(value = "/{id}")
	public Customer getOne(@PathVariable Long id) {
		return repo.findById(id)
				.orElseThrow(() -> new CustomerIdNotFoundException(id));
	}
	
	@PostMapping(value = "/create")
	public Customer add(@RequestBody final Customer customer) {
		try {
			Customer temp = repo.findByUsername(customer.getUsername())
					.orElseThrow(() -> new UsernameNotFoundException());
			
			if (temp.getId() > 0)
				throw new UsernameTakenException();
			
		} catch (UsernameNotFoundException x) {
			System.out.println(x.getMessage());
		} catch (UsernameTakenException x) {
			throw x;
		}
		
		return repo.save(customer);
	}
	
	@PutMapping(value = "/edit/{id}")
	public Customer update(@RequestBody final Customer newCustomer, @PathVariable Long id) {
		return repo.findById(id)
		.map(customer -> {
			customer.setUsername(newCustomer.getUsername());
			customer.setRole(newCustomer.getRole());
			customer.setPin(newCustomer.getPin());
			return repo.save(customer);
		})
		.orElseThrow(() -> new CustomerIdNotFoundException(id));	
	}
	
	@PostMapping(value = "/login")
	public Customer login(@RequestBody final LoginDto credentials) {
		return repo.findByUsernameAndPin(credentials.getUsername(), credentials.getPin())
				.orElseThrow(() -> new InvalidLoginException());
	}
	
	@GetMapping(value = "/logout/{id}")
	public boolean logout(@PathVariable Long id) {
		Customer user = this.findCustomer(id);
		return true;
	}
	
	
	@DeleteMapping(value = "/delete/{id}")
	public void delete(@PathVariable Long id) {
		repo.deleteById(id);
	}
	
	public Customer findCustomer(Long id) {
		return repo.findById(id)
				.orElseThrow(() -> new CustomerIdNotFoundException(id));
	}
	
	
}

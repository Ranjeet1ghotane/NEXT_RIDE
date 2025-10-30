package com.app.Service;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Entity.*;
import com.app.Exception.ResourceNotFoundException;
import com.app.Repository.UserRepository;
@Service
public class UserServiceImpl implements UserService {

	
		@Autowired
		 private  UserRepository userRepository;

		   

		    // Register a new customer
		    public User registerUser(User user) {
    			    	user.setRole(Role.ROLE_CUSTOMER);
		        return userRepository.save(user);
		    }

		    // Update customer details
		    public User updateUser(Long id, User userDetails) {
		        User user = userRepository.findById(id)
		                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
		        
		        user.setId(id);
		        user.setPassword(userDetails.getPassword());
		        user.setRole(Role.ROLE_CUSTOMER);
		        user.setUserName(userDetails.getUserName());
		        user.setEmail(userDetails.getEmail());
		        user.setContact(userDetails.getContact());
		        user.setPincode(userDetails.getPincode());
		        user.setAddress(userDetails.getAddress());
		        return userRepository.save(user);
		    }

		    // Get all customers
		    public List<User> getAllUsers() {
		        return userRepository.findAll();
		    }

		    // Get customer by ID
		    public User getUserById(Long id) {
		        return userRepository.findById(id)
		                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
		    }
		    
		    public User saveUser(User user) {
		        return userRepository.save(user);
		    }
		    
	}



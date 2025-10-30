package com.app.Controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.DTO.FeedbackDTO;
import com.app.Entity.Feedback;
import com.app.Entity.User;
import com.app.Entity.Vehicle;
import com.app.Exception.ResourceNotFoundException;
import com.app.Repository.FeedbackRepository;
import com.app.Repository.UserRepository;
import com.app.Repository.VehicleRepository;
import com.app.Service.UserService;

@RestController
@RequestMapping("/customer")
@CrossOrigin("http://localhost:3000")
public class UserController {
@Autowired
    private  UserService userService;

@Autowired
private UserRepository repository;

@Autowired
  private PasswordEncoder passwordEncoder;

@Autowired
private VehicleRepository vehicleRepository;

@Autowired
private FeedbackRepository  feedbackRepository;
  

    // 1. Register a new customer
    @PostMapping("/registerUser")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
        	user.setPassword(passwordEncoder.encode(user.getPassword()));
            User newUser = userService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering user");
        }
    }

    @PutMapping("/updateUser/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        try {
            // Get existing user from DB
            User existingUser = userService.getUserById(id);

            // Update individual fields only if they are present in the request
            if (userDetails.getUserName() != null)
                existingUser.setUserName(userDetails.getUserName());

            if (userDetails.getEmail() != null)
                existingUser.setEmail(userDetails.getEmail());

            if (userDetails.getContact() != null)
                existingUser.setContact(userDetails.getContact());

            if (userDetails.getPassword() != null && !userDetails.getPassword().isBlank())
                existingUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));

            User updatedUser = userService.saveUser(existingUser);

            return ResponseEntity.ok(updatedUser);

        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with ID: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user");
        }
    }


    // 3. Get all customers
    @GetMapping("/getAllUsers")
    public ResponseEntity<?> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching users");
        }
    }

    // 4. Get customer by ID
    @GetMapping("/getUserById/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching user");
        }
    }
    @PostMapping("/addFeedback")
    public Long addFeedback(Long userId, String comment) {
        Optional<User> user = repository.findById(userId);
     //   Optional<Vehicle> vehicle = vehicleRepository.findById(vehicleId);

        if (user.isEmpty() ) {
            throw new RuntimeException("User or Vehicle not found");
        }

        Feedback feedback = new Feedback();
        feedback.setUser(user.get());
        feedback.setComment(comment);

        feedbackRepository.save(feedback);
        return feedback.getFeedbackId();
    }
    
    @GetMapping("/getAllFeedback")
    public List<FeedbackDTO> getAllFeedback() {
        return feedbackRepository.findAll()
                .stream()
                .map(f -> new FeedbackDTO(f.getFeedbackId(), f.getUser().getUserName(), f.getComment()))
                .collect(Collectors.toList());
    }
   
}


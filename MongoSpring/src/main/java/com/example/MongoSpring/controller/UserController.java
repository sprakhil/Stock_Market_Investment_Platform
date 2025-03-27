package com.example.MongoSpring.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.MongoSpring.model.User;
import com.example.MongoSpring.repository.UserRepository;


@RestController
@RequestMapping("api/users")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        // Check if email or username already exists
        Optional<User> existingEmail = userRepository.findByEmail(user.getEmail());
        Optional<User> existingUsername = userRepository.findByUsername(user.getUsername());
        
        if (existingEmail.isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }
        if (existingUsername.isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists!");
        }
        
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        // Try to find by email first, then by username
        Optional<User> userByEmail = userRepository.findByEmail(loginRequest.getEmail());
        Optional<User> userByUsername = userRepository.findByUsername(loginRequest.getUsername());
        
        User user = userByEmail.orElseGet(() -> userByUsername.orElse(null));
        
        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok(user); // Return user details including username
        }
        return ResponseEntity.badRequest().body("Invalid credentials");
    }
}

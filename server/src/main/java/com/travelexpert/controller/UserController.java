package com.travelexpert.controller;

import com.travelexpert.model.User;
import com.travelexpert.repository.UserRepository;
import com.travelexpert.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    private JwtUtil jwtUtil;

    UserController (UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/register")
    public User createUser(@Valid @RequestBody User user) {
        // Prevent registration with ROLE_ADMIN
        if ("ROLE_ADMIN".equals(user.getRole())) {
            throw new IllegalArgumentException("Registration with ROLE_ADMIN is not allowed.");
        }

        // Automatically assign ROLE_USER
        user.setRole("ROLE_USER");
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public Map<String, String> loginUser(@RequestBody User user) {
        User existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            String token = jwtUtil.generateToken(existingUser.getUsername(), existingUser.getRole());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("role", existingUser.getRole());
            return response;
        } else {
            throw new IllegalArgumentException("Invalid username or password.");
        }
    }
}
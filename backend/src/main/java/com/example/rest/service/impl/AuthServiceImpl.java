package com.example.rest.service.impl;
import com.example.rest.dto.LoginResponse;
import com.example.rest.exception.CustomException;
import com.example.rest.model.User;
import com.example.rest.repository.UserRepository;
import com.example.rest.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public LoginResponse login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new CustomException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new CustomException("Invalid username or password");
        }

        return new LoginResponse(
            user.getUsername(),
            user.getRole(),
            "Login successful",
            user.getId()
    );
    }

}


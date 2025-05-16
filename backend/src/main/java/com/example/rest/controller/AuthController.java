package com.example.rest.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.rest.dto.LoginResponse;
import com.example.rest.service.AuthService;
@RestController 
@CrossOrigin
public class AuthController {
    @Autowired
    private AuthService authService;
    @PostMapping("/api/login")
    public LoginResponse login(@RequestBody Map<String, String> request) {
    String username = request.get("username");
    String password = request.get("password");
    return authService.login(username, password);
}
}

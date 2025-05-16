package com.example.rest.service;

import com.example.rest.dto.LoginResponse;

public interface AuthService {
    LoginResponse login(String username, String password);

}

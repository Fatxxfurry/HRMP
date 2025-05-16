package com.example.rest.dto;

public class LoginResponse {
    private String username;
    private String role;
    private String message;
    private Long id;

    public LoginResponse(String username, String role, String message, Long id) {
        this.username = username;
        this.role = role;
        this.message = message;
        this.id = id;
    }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id;
}
}
package com.example.rest.dto;

public class LoginResponse {
    private String username;
    private String role;
    private String message;
    private Long id;
    private String name;
    private String avatar;
    public LoginResponse(String username, String role, String message, Long id, String name, String avatar) {
        this.username = username;
        this.role = role;
        this.message = message;
        this.id = id;
        this.name = name;
        this.avatar = avatar;
    }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
}
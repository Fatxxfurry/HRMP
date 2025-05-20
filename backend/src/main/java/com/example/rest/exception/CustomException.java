package com.example.rest.exception;


public class CustomException extends RuntimeException {
    public CustomException(String message) {
        super(message);
    }
}
package com.example.rest.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class SayhelloController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello";
    }
}


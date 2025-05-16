package com.example.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.rest.model.Request;

public interface RequestRepository extends JpaRepository<Request, Long> {
    
}


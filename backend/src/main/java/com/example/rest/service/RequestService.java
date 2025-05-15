package com.example.rest.service;

import java.util.List;

import com.example.rest.model.Request;

public interface RequestService {
    
    List<Request> getAllRequests();
    
    Request getRequestById(Long id);
    
    Request createRequest(Request request);
    
    Request updateRequest(Long id, Request request);
    
    void deleteRequest(Long id);
}


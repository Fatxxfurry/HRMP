package com.example.rest.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rest.model.Department;
import com.example.rest.model.Employee;
import com.example.rest.model.Request;
import com.example.rest.repository.DepartmentRepository;
import com.example.rest.repository.EmployeeRepository;
import com.example.rest.repository.RequestRepository;
import com.example.rest.service.RequestService;

@Service
public class RequestServiceImpl implements RequestService{
    
    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    @Override
    public Request getRequestById(Long id) {
        return requestRepository.findById(id).orElse(null);
    }

    @Override
    public Request createRequest(Request request) {
        Employee employee = employeeRepository.findById(request.getEmployee().getId()).orElse(null);
        request.setEmployee(employee);
        Department department = departmentRepository.findById(request.getDepartment().getId()).orElse(null);
        request.setDepartment(department);
        return requestRepository.save(request);
    }

    @Override
    public Request updateRequest(Long id, Request request) {
        Request existingRequest = requestRepository.findById(id).orElseThrow();
        if (request.getName() != null) {
            existingRequest.setName(request.getName());
        }
        if (request.getRequestDate() != null) {
            existingRequest.setRequestDate(request.getRequestDate());
        }
        if (request.getDescription() != null) {
            existingRequest.setDescription(request.getDescription());
        }
        if (request.getEmployee() != null) {
            Employee employee = employeeRepository.findById(request.getEmployee().getId()).orElse(null);
            existingRequest.setEmployee(employee);
        }
        if (request.getDepartment() != null) {
            Department department = departmentRepository.findById(request.getDepartment().getId()).orElse(null);
            existingRequest.setDepartment(department);
        }
        if (request.getStatus() != null) {
            existingRequest.setStatus(request.getStatus());
        }
        return requestRepository.save(existingRequest);
    }

    @Override
    public void deleteRequest(Long id) {
        requestRepository.deleteById(id);
    }
}


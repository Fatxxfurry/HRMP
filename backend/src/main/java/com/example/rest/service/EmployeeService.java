package com.example.rest.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.rest.model.Employee;
public interface EmployeeService {
    Employee createEmployee(Employee employee);
    List<Employee> getAllEmployees();
    Employee getEmployeeById(Long id);

    Employee updateEmployee(Long id, Employee employee);
    
    Employee updateImage(Employee employee, MultipartFile file);
    void deleteEmployee(Long id);
}

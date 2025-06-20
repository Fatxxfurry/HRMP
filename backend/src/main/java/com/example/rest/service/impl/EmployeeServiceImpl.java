package com.example.rest.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.rest.model.Employee;
import com.example.rest.repository.EmployeeRepository;
import com.example.rest.service.EmployeeService;
@Service
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }
    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }
    @Override
    public Employee updateEmployee(Long id, Employee employee) {
        Employee existingEmployee = employeeRepository.findById(id).orElse(null);
        if (existingEmployee != null) {
            if(employee.getName() != null) existingEmployee.setName(employee.getName());
            if(employee.getAddress() != null) existingEmployee.setAddress(employee.getAddress());
            if(employee.getRole() != null) existingEmployee.setRole(employee.getRole());
            if(employee.getEmail() != null) existingEmployee.setEmail(employee.getEmail());
            if(employee.getPhone() != null) existingEmployee.setPhone(employee.getPhone());
            if(employee.getPassword() != null) existingEmployee.setPassword(employee.getPassword());
            if(employee.getAge() != null) existingEmployee.setAge(employee.getAge());
            if (employee.getPosition() != null) existingEmployee.setPosition(employee.getPosition());
            if(employee.getStatus() != null) existingEmployee.setStatus(employee.getStatus());
            if(employee.getBirth_date() != null) existingEmployee.setBirth_date(employee.getBirth_date());
            if(employee.getHire_date() != null) existingEmployee.setHire_date(employee.getHire_date());
            if(employee.getBank() != null) existingEmployee.setBank(employee.getBank());
            if(employee.getBank_number() != null) existingEmployee.setBank_number(employee.getBank_number());
            if(employee.getInsurance() != null) existingEmployee.setInsurance(employee.getInsurance());
            return employeeRepository.save(existingEmployee);
        }
        return null;
    }
    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
    @Override
    public Employee updateImage(Employee employee, MultipartFile file) {
        try {
            String employeeId = employee.getId().toString();
            String fileName = file.getOriginalFilename();
            String fileExtension = fileName.substring(fileName.lastIndexOf("."));
            fileName = employeeId + fileExtension;
            Path path = Paths.get("uploads/" + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            employee.setImage(fileName);
            return employeeRepository.save(employee);
        } catch (IOException e) {
            return null;
        }
    }
}

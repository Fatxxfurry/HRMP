package com.example.rest.service.impl;
import java.util.List;

import org.springframework.stereotype.Service;

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

            return employeeRepository.save(existingEmployee);
        }
        return null;
    }
    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

}

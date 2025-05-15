package com.example.rest.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.rest.model.Department;
import com.example.rest.model.Employee;
import com.example.rest.repository.DepartmentRepository;
import com.example.rest.repository.EmployeeRepository;
import com.example.rest.service.DepartmentService;

@Service
public class DepartmentServiceImpl implements DepartmentService {
    
    private final  DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository, EmployeeRepository employeeRepository) {
        this.departmentRepository = departmentRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Department createDepartment(Department department) {
        Employee employee = employeeRepository.findById(department.getEmployee().getId()).orElse(null);
        department.setEmployee(employee);
        return departmentRepository.save(department);
    }

    @Override
    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id).orElse(null);
    }

    @Override
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @Override
    public Department updateDepartment(Long id, Department department) {
        Department existingDepartment = getDepartmentById(id);
        if (existingDepartment != null) {
            if (department.getName() != null) {
                existingDepartment.setName(department.getName());
            }
            if (department.getEmployee() != null) {
                Employee employee = employeeRepository.findById(department.getEmployee().getId()).orElse(null);
                existingDepartment.setEmployee(employee);
            }
            return departmentRepository.save(existingDepartment);
        }
        return null;
    }

    @Override
    public void deleteDepartment(Long id) {
        departmentRepository.deleteById(id);
    }
}

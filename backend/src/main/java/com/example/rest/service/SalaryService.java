package com.example.rest.service;

import java.util.List;

import com.example.rest.model.Salary;
public interface SalaryService {
    List<Salary> getAllSalaries();
    Salary getSalaryById(Long id);
    Salary createSalary(Salary salary);
    Salary updateSalary(Long id, Salary salary);
    void deleteSalary(Long id);
    
}


package com.example.rest.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rest.model.Salary;
import com.example.rest.repository.SalaryRepository;
import com.example.rest.service.SalaryService;

@Service
public class SalaryServiceImpl implements SalaryService {
    
    @Autowired
    private SalaryRepository salaryRepository;
    
    @Override
    public List<Salary> getAllSalaries() {
        return salaryRepository.findAll();
    }
    
    @Override
    public Salary getSalaryById(Long id) {
        return salaryRepository.findById(id).orElse(null);
    }
    
    @Override
    public Salary createSalary(Salary salary) {
        return salaryRepository.save(salary);
    }
    
    @Override
    public Salary updateSalary(Long id, Salary salary) {
        Salary existingSalary = getSalaryById(id);
        if(existingSalary == null) {
            return null;
        }
        if(salary.getBasic_salary() != null) {
            existingSalary.setBasic_salary(salary.getBasic_salary());
        }
        if(salary.getBonus() != null) {
            existingSalary.setBonus(salary.getBonus());
        }
        if(salary.getMinus() != null) {
            existingSalary.setMinus(salary.getMinus());
        }
        if(salary.getBonus_reason() != null) {
            existingSalary.setBonus_reason(salary.getBonus_reason());
        }
        if(salary.getMinus_reason() != null) {
            existingSalary.setMinus_reason(salary.getMinus_reason());
        }
        return salaryRepository.save(existingSalary);
    }
    
    @Override
    public void deleteSalary(Long id) {
        salaryRepository.deleteById(id);
    }
    
}


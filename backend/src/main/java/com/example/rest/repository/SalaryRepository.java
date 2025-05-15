package com.example.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.rest.model.Salary;

public interface SalaryRepository extends JpaRepository<Salary, Long> {
    @Query("SELECT s FROM Salary s WHERE s.employee.id = ?1")
    Salary findByEmployeeId(Long employeeId);
}


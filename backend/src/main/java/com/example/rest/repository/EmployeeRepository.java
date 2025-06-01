package com.example.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.rest.model.Employee;
public interface  EmployeeRepository extends JpaRepository<Employee, Long> {
}

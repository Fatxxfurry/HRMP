package com.example.rest.repository;

import com.example.rest.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
public interface  DepartmentRepository extends JpaRepository<Department, Long> {
}

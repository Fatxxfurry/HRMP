package com.example.rest.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.rest.model.Attendence;
import com.example.rest.model.Employee;

public interface AttendenceRepository extends JpaRepository<Attendence, Long> {
    List<Attendence> findByEmployeeAndDate(Employee employee, LocalDate date);
}

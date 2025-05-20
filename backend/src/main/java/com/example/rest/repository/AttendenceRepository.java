package com.example.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.rest.model.Attendence;

public interface AttendenceRepository extends JpaRepository<Attendence, Long> {
}

package com.example.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.rest.model.Employee;
import com.example.rest.model.FaceEncoding;

@Repository
public interface FaceEncodingRepository extends JpaRepository<FaceEncoding, Long> {
    FaceEncoding findFirstByEmployee(Employee employee);
}


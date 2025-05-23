package com.example.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.rest.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
}


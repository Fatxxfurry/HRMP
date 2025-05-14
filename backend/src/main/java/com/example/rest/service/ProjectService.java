package com.example.rest.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.rest.model.Project;

public interface ProjectService {
    public Project createProject(Project project);
    public List<Project> getAllProjects();
    public Project getProjectById(Long id);
    public Project updateProject(Long id, Project project);
    public void deleteProject(Long id);
}


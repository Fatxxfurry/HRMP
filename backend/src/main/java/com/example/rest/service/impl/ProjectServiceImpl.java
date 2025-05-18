package com.example.rest.service.impl;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.rest.model.Department;
import com.example.rest.model.Employee;
import com.example.rest.model.Project;
import com.example.rest.repository.DepartmentRepository;
import com.example.rest.repository.EmployeeRepository;
import com.example.rest.repository.ProjectRepository;
import com.example.rest.service.ProjectService;
@Service
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    
    public ProjectServiceImpl(ProjectRepository projectRepository, EmployeeRepository employeeRepository, DepartmentRepository departmentRepository) {
        this.projectRepository = projectRepository;
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
    }
    
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
    
    public Project getProjectById(Long id) {
        return projectRepository.findById(id).orElse(null);
    }
    
    public Project createProject(Project project) {
        Department department = departmentRepository.findById(project.getInvolededDepartments().getId()).orElse(null);
        project.setInvolededDepartments(department);
        Employee employee = employeeRepository.findById(project.getEmployee().getId()).orElse(null);
        project.setEmployee(employee);
        return projectRepository.save(project);
    }
    
    public Project updateProject(Long id, Project project) {
        Project existingProject = getProjectById(id);
        if (existingProject == null) {
            return null;
        }
        if(project.getName() != null) existingProject.setName(project.getName());
        if(project.getEmployee() != null) existingProject.setEmployee(employeeRepository.findById(project.getEmployee().getId()).orElse(null));
        if(project.isFinished() != existingProject.isFinished()) existingProject.setFinished(project.isFinished());
        if(project.getStart_date() != null) existingProject.setStart_date(project.getStart_date());
        if(project.getEnd_date() != null) existingProject.setEnd_date(project.getEnd_date());
        if (project.getInvolededDepartments() != null)
            existingProject.setInvolededDepartments(
                    departmentRepository.findById(project.getInvolededDepartments().getId()).orElse(null));
        return projectRepository.save(existingProject);
    }
    
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}

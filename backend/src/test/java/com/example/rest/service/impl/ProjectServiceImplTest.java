package com.example.rest.service.impl;

import com.example.rest.model.Project;
import com.example.rest.model.Employee;
import com.example.rest.model.Department;
import com.example.rest.repository.ProjectRepository;
import com.example.rest.repository.EmployeeRepository;
import com.example.rest.repository.DepartmentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProjectServiceImplTest {

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private DepartmentRepository departmentRepository;

    @InjectMocks
    private ProjectServiceImpl projectService;

    private Project project;
    private Employee employee;
    private Department department;

    @BeforeEach
    void setUp() {
        employee = new Employee();
        employee.setId(1L);
        employee.setName("Nguyen Van A");

        department = new Department();
        department.setId(1L);
        department.setName("IT");

        project = new Project();
        project.setId(1L);
        project.setName("Project X");
        project.setFinished(false);
        project.setStart_date(LocalDate.of(2025, 6, 1));
        project.setEnd_date(LocalDate.of(2025, 12, 31));
        project.setEmployee(employee);
        project.setInvolededDepartments(department);
    }

    @Test
    void testGetAllProjects() {
        when(projectRepository.findAll()).thenReturn(Arrays.asList(project));
        List<Project> result = projectService.getAllProjects();
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(project, result.get(0));
        verify(projectRepository).findAll();
    }

    @Test
    void testGetProjectById_Success() {
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));
        Project result = projectService.getProjectById(1L);
        assertNotNull(result);
        assertEquals(project, result);
        verify(projectRepository).findById(1L);
    }

    @Test
    void testGetProjectById_NotFound() {
        when(projectRepository.findById(1L)).thenReturn(Optional.empty());
        Project result = projectService.getProjectById(1L);
        assertNull(result);
        verify(projectRepository).findById(1L);
    }

    @Test
    void testCreateProject_Success() {
        Project inputProject = new Project();
        inputProject.setEmployee(employee);
        inputProject.setInvolededDepartments(department);
        inputProject.setName("Project X");
        inputProject.setStart_date(LocalDate.of(2025, 6, 1));

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(projectRepository.save(inputProject)).thenReturn(project);

        Project result = projectService.createProject(inputProject);
        assertNotNull(result);
        assertEquals(employee, result.getEmployee());
        assertEquals(department, result.getInvolededDepartments());
        verify(employeeRepository).findById(1L);
        verify(departmentRepository).findById(1L);
        verify(projectRepository).save(inputProject);
    }

    @Test
    void testCreateProject_NullInput() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            projectService.createProject(null);
        });
        assertEquals("Project cannot be null", exception.getMessage());
        verify(projectRepository, never()).save(any());
    }

    @Test
    void testCreateProject_NullEmployee() {
        Project inputProject = new Project();
        inputProject.setEmployee(null);
        inputProject.setInvolededDepartments(department);
        inputProject.setName("Project X");

        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(projectRepository.save(inputProject)).thenReturn(inputProject);

        Project result = projectService.createProject(inputProject);
        assertNotNull(result);
        assertNull(result.getEmployee());
        assertEquals(department, result.getInvolededDepartments());
        verify(employeeRepository, never()).findById(anyLong());
        verify(departmentRepository).findById(1L);
        verify(projectRepository).save(inputProject);
    }

    @Test
    void testCreateProject_NullDepartment() {
        Project inputProject = new Project();
        inputProject.setEmployee(employee);
        inputProject.setInvolededDepartments(null);
        inputProject.setName("Project X");

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(projectRepository.save(inputProject)).thenReturn(inputProject);

        Project result = projectService.createProject(inputProject);
        assertNotNull(result);
        assertEquals(employee, result.getEmployee());
        assertNull(result.getInvolededDepartments());
        verify(employeeRepository).findById(1L);
        verify(departmentRepository, never()).findById(anyLong());
        verify(projectRepository).save(inputProject);
    }

    @Test
    void testUpdateProject_Success() {
        Project updatedProject = new Project();
        updatedProject.setName("Updated Project");
        updatedProject.setEmployee(employee);
        updatedProject.setInvolededDepartments(department);
        updatedProject.setStart_date(LocalDate.of(2025, 7, 1));
        updatedProject.setEnd_date(LocalDate.of(2026, 1, 1));
        updatedProject.setFinished(true);

        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(projectRepository.save(project)).thenReturn(project);

        Project result = projectService.updateProject(1L, updatedProject);
        assertNotNull(result);
        assertEquals("Updated Project", result.getName());
        assertEquals(true, result.isFinished());
        verify(projectRepository).findById(1L);
        verify(employeeRepository).findById(1L);
        verify(departmentRepository).findById(1L);
        verify(projectRepository).save(project);
    }

    @Test
    void testUpdateProject_NotFound() {
        Project updatedProject = new Project();
        when(projectRepository.findById(1L)).thenReturn(Optional.empty());
        Project result = projectService.updateProject(1L, updatedProject);
        assertNull(result);
        verify(projectRepository).findById(1L);
        verify(projectRepository, never()).save(any());
    }

    @Test
    void testDeleteProject() {
        doNothing().when(projectRepository).deleteById(1L);
        projectService.deleteProject(1L);
        verify(projectRepository).deleteById(1L);
    }
}
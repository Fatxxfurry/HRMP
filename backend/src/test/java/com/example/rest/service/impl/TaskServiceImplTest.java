package com.example.rest.service.impl;

import com.example.rest.model.Task;
import com.example.rest.model.Employee;
import com.example.rest.model.Project;
import com.example.rest.repository.TaskRepository;
import com.example.rest.repository.EmployeeRepository;
import com.example.rest.repository.ProjectRepository;
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
public class TaskServiceImplTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private TaskServiceImpl taskService;

    private Task task;
    private Employee employee;
    private Project project;

    @BeforeEach
    void setUp() {
        employee = new Employee();
        employee.setId(1L);
        employee.setName("Nguyen Van A");

        project = new Project();
        project.setId(1L);
        project.setName("Project X");

        task = new Task();
        task.setId(1L);
        task.setName("Task 1");
        task.setDescription("Do something");
        task.setEmployee(employee);
        task.setProject(project);
        task.setStart_date(LocalDate.of(2025, 6, 1));
        task.setEnd_date(LocalDate.of(2025, 6, 10));
        task.setFinished(false);
    }

    @Test
    void testGetAllTasks() {
        when(taskRepository.findAll()).thenReturn(Arrays.asList(task));
        List<Task> result = taskService.getAllTasks();
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(task, result.get(0));
        verify(taskRepository).findAll();
    }

    @Test
    void testGetTaskById_Success() {
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        Task result = taskService.getTaskById(1L);
        assertNotNull(result);
        assertEquals(task, result);
        verify(taskRepository).findById(1L);
    }

    @Test
    void testGetTaskById_NotFound() {
        when(taskRepository.findById(1L)).thenReturn(Optional.empty());
        Task result = taskService.getTaskById(1L);
        assertNull(result);
        verify(taskRepository).findById(1L);
    }

    @Test
    void testCreateTask_Success() {
        Task inputTask = new Task();
        inputTask.setEmployee(employee);
        inputTask.setProject(project);
        inputTask.setName("Task 1");
        inputTask.setDescription("Do something");

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));
        when(taskRepository.save(inputTask)).thenReturn(task);

        Task result = taskService.createTask(inputTask);
        assertNotNull(result);
        assertEquals(employee, result.getEmployee());
        assertEquals(project, result.getProject());
        verify(employeeRepository).findById(1L);
        verify(projectRepository).findById(1L);
        verify(taskRepository).save(inputTask);
    }

    @Test
    void testCreateTask_NullInput() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            taskService.createTask(null);
        });
        assertEquals("Task cannot be null", exception.getMessage());
        verify(taskRepository, never()).save(any());
    }

    @Test
    void testCreateTask_NullEmployee() {
        Task inputTask = new Task();
        inputTask.setEmployee(null);
        inputTask.setProject(project);
        inputTask.setName("Task 1");

        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));
        when(taskRepository.save(inputTask)).thenReturn(inputTask);

        Task result = taskService.createTask(inputTask);
        assertNotNull(result);
        assertNull(result.getEmployee());
        assertEquals(project, result.getProject());
        verify(employeeRepository, never()).findById(anyLong());
        verify(projectRepository).findById(1L);
        verify(taskRepository).save(inputTask);
    }

    @Test
    void testCreateTask_NullProject() {
        Task inputTask = new Task();
        inputTask.setEmployee(employee);
        inputTask.setProject(null);
        inputTask.setName("Task 1");

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(taskRepository.save(inputTask)).thenReturn(inputTask);

        Task result = taskService.createTask(inputTask);
        assertNotNull(result);
        assertEquals(employee, result.getEmployee());
        assertNull(result.getProject());
        verify(employeeRepository).findById(1L);
        verify(projectRepository, never()).findById(anyLong());
        verify(taskRepository).save(inputTask);
    }

    @Test
    void testUpdateTask_Success() {
        Task updatedTask = new Task();
        updatedTask.setName("Updated Task");
        updatedTask.setDescription("Updated description");
        updatedTask.setEmployee(employee);
        updatedTask.setProject(project);
        updatedTask.setFinished(true);

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));
        when(taskRepository.save(task)).thenReturn(task);

        Task result = taskService.updateTask(1L, updatedTask);
        assertNotNull(result);
        assertEquals("Updated Task", result.getName());
        assertEquals(true, result.isFinished());
        verify(taskRepository).findById(1L);
        verify(employeeRepository).findById(1L);
        verify(projectRepository).findById(1L);
        verify(taskRepository).save(task);
    }

    @Test
    void testUpdateTask_NotFound() {
        Task updatedTask = new Task();
        when(taskRepository.findById(1L)).thenReturn(Optional.empty());
        Task result = taskService.updateTask(1L, updatedTask);
        assertNull(result);
        verify(taskRepository).findById(1L);
        verify(taskRepository, never()).save(any());
    }

    @Test
    void testDeleteTask() {
        doNothing().when(taskRepository).deleteById(1L);
        taskService.deleteTask(1L);
        verify(taskRepository).deleteById(1L);
    }
}
package com.example.rest.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.rest.model.Employee;
import com.example.rest.model.Project;
import com.example.rest.model.Task;
import com.example.rest.repository.EmployeeRepository;
import com.example.rest.repository.ProjectRepository;
import com.example.rest.repository.TaskRepository;
import com.example.rest.service.TaskService;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final EmployeeRepository employeeRepository;
    private final ProjectRepository projectRepository;

    public TaskServiceImpl(TaskRepository taskRepository, EmployeeRepository employeeRepository,
            ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.employeeRepository = employeeRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    

    @Override
    public Task createTask(Task task) {
        Employee employee = employeeRepository.findById(task.getEmployee().getId()).orElse(null);
        Project project = projectRepository.findById(task.getProject().getId()).orElse(null);
        task.setEmployee(employee);
        task.setProject(project);
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Long id, Task task) {
        Task existingTask = getTaskById(id);
        if (existingTask != null) {
            if (task.getEmployee() != null) {
                Employee employee = employeeRepository.findById(task.getEmployee().getId()).orElse(null);
                existingTask.setEmployee(employee);
            }
            if (task.getProject() != null) {
                Project project = projectRepository.findById(task.getProject().getId()).orElse(null);
                existingTask.setProject(project);
            }
            if (task.getName() != null)
                existingTask.setName(task.getName());
            if (task.getDescription() != null)
                existingTask.setDescription(task.getDescription());
            if (task.isFinished() != existingTask.isFinished())
                existingTask.setFinished(task.isFinished());
            return taskRepository.save(existingTask);
        }
        return null;
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }



}

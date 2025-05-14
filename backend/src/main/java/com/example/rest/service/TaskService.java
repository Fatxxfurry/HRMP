package com.example.rest.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.rest.model.Task;
@Service
public interface TaskService {
    
    List<Task> getAllTasks();
    
    Task getTaskById(Long id);
    
    Task createTask(Task task);
    
    Task updateTask(Long id, Task task);
    
    void deleteTask(Long id);
}

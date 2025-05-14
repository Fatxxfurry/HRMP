package com.example.rest.service;

import com.example.rest.model.Department;

import java.util.List;
public interface  DepartmentService {
    //create department
    public Department createDepartment(Department department);

    //get department by id
    public Department getDepartmentById(Long id);

    //get all departments
    public List<Department> getAllDepartments();

    //update department
    public Department updateDepartment(Long id, Department department);

    //delete department
    public void deleteDepartment(Long id);

}

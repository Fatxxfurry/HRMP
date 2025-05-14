package com.example.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rest.model.Department;
import com.example.rest.service.DepartmentService;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

	@Autowired
	private DepartmentService departmentService;

	// build create department REST API
	@PostMapping
	public ResponseEntity<Department> saveDepartment(@RequestBody Department department) {
		return new ResponseEntity<Department>(departmentService.createDepartment(department), HttpStatus.CREATED);
	}

	// build get all departments RESTAPI
	@GetMapping
	public List<Department> getAllDepartments() {
		return departmentService.getAllDepartments();

	}

	// Build get department by id RESTAPI
	@GetMapping("{id}")
	public ResponseEntity<Department> getDepartmentById(@PathVariable("id") long id) {

		Department department = departmentService.getDepartmentById(id);
		if (department != null) {
			return new ResponseEntity<Department>(department, HttpStatus.OK);
		} else {
			return new ResponseEntity<Department>(HttpStatus.NOT_FOUND);
		}
	}

	// update department
	@PutMapping("{id}")
	public ResponseEntity<Department> updateDepartment(@PathVariable("id") long id,
			@RequestBody Department department) {
		Department updatedDepartment = departmentService.updateDepartment(id, department);
		if (updatedDepartment != null) {
			return new ResponseEntity<Department>(updatedDepartment, HttpStatus.OK);
		} else {
			return new ResponseEntity<Department>(HttpStatus.NOT_FOUND);
		}
	}

	// build delete department REST API
	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteDepartment(@PathVariable("id") long id) {

		// delete department from DB
		Department department = departmentService.getDepartmentById(id);
		if (department != null) {
			departmentService.deleteDepartment(id);
			return new ResponseEntity<String>("Department deleted successfully!.", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("Department not found!", HttpStatus.NOT_FOUND);
		}
	}
}

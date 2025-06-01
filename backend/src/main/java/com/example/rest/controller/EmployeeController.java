package com.example.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.multipart.MultipartFile;

import com.example.rest.model.Employee;
import com.example.rest.service.EmployeeService;

import org.springframework.web.bind.annotation.RequestParam;

import com.example.rest.model.FaceEncoding;
import com.example.rest.service.FaceEncodingService;


@RestController
@CrossOrigin
@RequestMapping("/api/employees")
public class EmployeeController {
	@Autowired
	private EmployeeService employeeService;
	private FaceEncodingService faceEncodingService;

	public EmployeeController(EmployeeService employeeService, FaceEncodingService faceEncodingService) {
		super();
		this.employeeService = employeeService;
		this.faceEncodingService = faceEncodingService;
	}
	   
	//Build Create employee RestApi
	@PostMapping
	public ResponseEntity<Employee> saveEmployee(@RequestBody Employee employee)
	{
		return new ResponseEntity<Employee>(employeeService.createEmployee(employee),HttpStatus.CREATED);
	}
		//Build get all employees RESTAPI
 	@GetMapping
 	public ResponseEntity<List<Employee>> getAllEmployees(){
 		return new ResponseEntity<List<Employee>>(employeeService.getAllEmployees(),HttpStatus.OK);
 		
 	}
 	
 	//Build  get employee by id RESTAPI
 	@GetMapping("{id}")
 	public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") long employeeId){
 		
 		Employee employee = employeeService.getEmployeeById(employeeId);
 		if(employee != null) {
 			return new ResponseEntity<Employee>(employee,HttpStatus.OK);
 		} else {
 			return new ResponseEntity<Employee>(HttpStatus.NOT_FOUND);
 		}
 		
 	}
 	
 	
    @PutMapping("{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable("id") long id,
                                                   @RequestBody Employee employee) {
        Employee updatedEmployee = employeeService.updateEmployee(id, employee);
        if (updatedEmployee != null) {
            return new ResponseEntity<Employee>(updatedEmployee, HttpStatus.OK);
        } else {
            return new ResponseEntity<Employee>(HttpStatus.NOT_FOUND);
        }
    }
 	
 	
 // build delete employee REST API
 	// http://localhost:8080/api/employees/1
 	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable("id") long id) {

		// delete employee from DB
		Employee employee = employeeService.getEmployeeById(id);
		if (employee != null) {
			employeeService.deleteEmployee(id);
			return new ResponseEntity<String>("Employee deleted successfully!.", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("Employee not found!", HttpStatus.NOT_FOUND);
		}
	}
 	
 	@PostMapping("{id}/image")
 	public ResponseEntity<String> uploadImage(@PathVariable("id") long id, @RequestParam("image") MultipartFile file) throws Exception {
		Employee employee = employeeService.getEmployeeById(id);
		if(employee != null && !file.isEmpty()) {
			String encodedImage = faceEncodingService.getEncodingCodeFromPython(file.getBytes());
			faceEncodingService.createFaceEncoding(employee, encodedImage);
 			employee = employeeService.updateImage(employee, file);
 			return new ResponseEntity<String>("Image uploaded successfully!.", HttpStatus.OK);
 		} else {
 			return new ResponseEntity<String>("Employee not found!", HttpStatus.NOT_FOUND);
 		}
 	}
	
}

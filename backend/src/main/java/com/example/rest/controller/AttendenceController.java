package com.example.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.rest.dto.AttendanceStatusCalculate;
import com.example.rest.model.Attendence;
import com.example.rest.model.enums.AttendenceStatus;
import com.example.rest.service.AttendenceService;
import com.example.rest.service.EmployeeService;
import com.example.rest.service.FaceRecognitionService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin
@RequestMapping("/api/attendence")
public class AttendenceController {

    private final AttendenceService attendenceService;
    private final FaceRecognitionService faceRecognitionService;
    private final EmployeeService employeeService;

    @Autowired
    public AttendenceController(AttendenceService attendenceService, FaceRecognitionService faceRecognitionService,EmployeeService employeeService) {
        this.employeeService = employeeService;
        this.faceRecognitionService = faceRecognitionService;
        this.attendenceService = attendenceService;
    }

    @GetMapping
    public List<Attendence> getAllAttendences() {
        return attendenceService.getAllAttendences();
    }

    @PostMapping("/calculateStatus") // Chuyển sang POST vì có @RequestBody
    public AttendenceStatus calculateStatus(@RequestBody AttendanceStatusCalculate request) {
        return attendenceService.calculateStatus(
                request.getEmployee(),
                request.getDate(),
                request.getLocalTime());
    }

    @GetMapping("/{id}")
    public Attendence getAttendenceById(@PathVariable Long id) {
        return attendenceService.getAttendenceById(id);
    }

    @PostMapping
    public Attendence createAttendence(@RequestBody Attendence attendence) {
        return attendenceService.createAttendence(attendence);
    }

    @PutMapping("/{id}")
    public Attendence updateAttendence(@PathVariable Long id, @RequestBody Attendence attendence) {
        return attendenceService.updateAttendence(id, attendence);
    }

    @DeleteMapping("/{id}")
    public void deleteAttendence(@PathVariable Long id) {
        attendenceService.deleteAttendence(id);
    }
    @PostMapping("/face")
    public Attendence recognizeFace(@RequestParam("image") MultipartFile file) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode root = mapper.readTree(faceRecognitionService.recognize(file));
            Long employee_id = root.get("employeeId").asLong();
            if (employee_id == 0) {
                return null;
            }
            var employee = employeeService.getEmployeeById(employee_id);
            return attendenceService.markAttendence(employee);
        } catch (JsonProcessingException e) {
            return null;
        }
    }
    @PostMapping("/face/checkout")
    public Attendence recognizeFaceCheckOut(@RequestParam("image") MultipartFile file) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode root = mapper.readTree(faceRecognitionService.recognize(file));
            Long employee_id = root.get("employeeId").asLong();
            if (employee_id == 0) {
                return null;
            }
            var employee = employeeService.getEmployeeById(employee_id);
            return attendenceService.markCheckoutAttendence(employee);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

}

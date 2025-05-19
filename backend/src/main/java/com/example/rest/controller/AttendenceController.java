package com.example.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rest.model.Attendence;
import com.example.rest.service.AttendenceService;

@RestController
@RequestMapping("/api/attendence")
public class AttendenceController {
    
    private final AttendenceService attendenceService;
    
    @Autowired
    public AttendenceController(AttendenceService attendenceService) {
        this.attendenceService = attendenceService;
    }
    
    @GetMapping
    public List<Attendence> getAllAttendences() {
        return attendenceService.getAllAttendences();
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
    
}


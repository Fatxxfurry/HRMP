package com.example.rest.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.example.rest.model.Attendence;
import com.example.rest.model.Employee;
import com.example.rest.model.enums.AttendenceStatus;

public interface AttendenceService {
    List<Attendence> getAllAttendences();

    Attendence getAttendenceById(Long id);
    
    Attendence createAttendence(Attendence attendence);

    Attendence updateAttendence(Long id, Attendence attendence);

    Attendence markAttendence(Employee employee);

    Attendence markCheckoutAttendence(Employee employee);

    AttendenceStatus calculateStatus(Employee employee, LocalDate date, LocalTime localTime);
    
    void deleteAttendence(Long id);
}


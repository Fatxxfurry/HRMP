package com.example.rest.service.impl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rest.model.Attendence;
import com.example.rest.model.Employee;
import com.example.rest.model.enums.AttendenceStatus;
import com.example.rest.repository.AttendenceRepository;
import com.example.rest.repository.EmployeeRepository;
import com.example.rest.repository.LeaveRequestRepository;
import com.example.rest.service.AttendenceService;

@Service
public class AttendencServiceImpl implements AttendenceService {

    private final AttendenceRepository attendenceRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final EmployeeRepository employeeRepository;

    @Autowired
    public AttendencServiceImpl(AttendenceRepository attendenceRepository, LeaveRequestRepository leaveRequestRepository, EmployeeRepository employeeRepository) {
        this.attendenceRepository = attendenceRepository;
        this.employeeRepository = employeeRepository;
        this.leaveRequestRepository = leaveRequestRepository;
    }

    @Override
    public List<Attendence> getAllAttendences() {
        return attendenceRepository.findAll();
    }

    @Override
    public Attendence getAttendenceById(Long id) {
        return attendenceRepository.findById(id).orElse(null);
    }

    @Override
    public Attendence createAttendence(Attendence attendence) {
        attendence.setEmployee(employeeRepository.findById(attendence.getEmployee().getId()).orElse(null));
        attendence.setStatus(calculateStatus(attendence.getEmployee(), attendence.getDate(), attendence.getCheckInTime()));
        return attendenceRepository.save(attendence);
    }

    @Override
    public Attendence updateAttendence(Long id, Attendence attendence) {
        Attendence existingAttendence = getAttendenceById(id);
        if (existingAttendence != null) {
            if (attendence.getCheckInTime() != null) {
                existingAttendence.setCheckInTime(attendence.getCheckInTime());
            }
            if (attendence.getCheckOutTime() != null) {
                existingAttendence.setCheckOutTime(attendence.getCheckOutTime());
            }
            if (attendence.getEmployee() != null) {
                existingAttendence.setEmployee(employeeRepository.findById(attendence.getEmployee().getId()).orElse(null));
            }
            if (attendence.getDate() != null) {
                existingAttendence.setDate(attendence.getDate());
            }
            existingAttendence.setStatus(calculateStatus(attendence.getEmployee(), attendence.getDate(), attendence.getCheckInTime()));
            return attendenceRepository.save(existingAttendence);
        }
        return null;
    }

    @Override
    public void deleteAttendence(Long id) {
        attendenceRepository.deleteById(id);
    }

    @Override
    public AttendenceStatus calculateStatus(Employee employee, LocalDate date, LocalTime checkInTime) {
    boolean isOnLeave = !leaveRequestRepository
        .findApprovedLeaveByEmployeeAndDate(employee.getId(), date)
        .isEmpty();

    if (isOnLeave) {
        return AttendenceStatus.ON_LEAVE;
    }

    if (checkInTime == null) {
        return AttendenceStatus.ABSENT;
    }

    return checkInTime.isAfter(LocalTime.of(8, 0)) 
        ? AttendenceStatus.LATE 
        : AttendenceStatus.PRESENT;
    }
}


package com.example.rest.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.rest.model.LeaveRequest;
import com.example.rest.repository.DepartmentRepository;
import com.example.rest.repository.EmployeeRepository;
import com.example.rest.repository.LeaveRequestRepository;
import com.example.rest.service.LeaveRequestService;

@Service
public class LeaveRequestServiceImpl implements LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;


    public LeaveRequestServiceImpl(LeaveRequestRepository leaveRequestRepository, EmployeeRepository employeeRepository, DepartmentRepository departmentRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
    }

    @Override
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }

    @Override
    public LeaveRequest getLeaveRequestById(Long id) {
        return leaveRequestRepository.findById(id).orElseThrow();
    }

    @Override
    public LeaveRequest createLeaveRequest(LeaveRequest leaveRequest) {
        leaveRequest.setEmployee(employeeRepository.findById(leaveRequest.getEmployee().getId()).orElse(null));
        leaveRequest.setDepartment(departmentRepository.findById(leaveRequest.getDepartment().getId()).orElse(null));
        return leaveRequestRepository.save(leaveRequest);
    }

    @Override
    public LeaveRequest updateLeaveRequest(Long id, LeaveRequest leaveRequest) {
        LeaveRequest existingLeaveRequest = getLeaveRequestById(id);
        if (leaveRequest.getStartDate() != null) {
            existingLeaveRequest.setStartDate(leaveRequest.getStartDate());
        }
        if (leaveRequest.getEndDate() != null) {
            existingLeaveRequest.setEndDate(leaveRequest.getEndDate());
        }
        if (leaveRequest.getReason() != null) {
            existingLeaveRequest.setReason(leaveRequest.getReason());
        }
        if (leaveRequest.getStatus() != null) {
            existingLeaveRequest.setStatus(leaveRequest.getStatus());
        }
        return leaveRequestRepository.save(existingLeaveRequest);
    }

    @Override
    public void deleteLeaveRequest(Long id) {
        leaveRequestRepository.deleteById(id);
    }
}


package com.example.rest.service;

import java.util.List;

import com.example.rest.model.LeaveRequest;
public interface LeaveRequestService {
    
    LeaveRequest createLeaveRequest(LeaveRequest leaveRequest);
    
    List<LeaveRequest> getAllLeaveRequests();
    
    LeaveRequest getLeaveRequestById(Long id);
    
    LeaveRequest updateLeaveRequest(Long id, LeaveRequest leaveRequest);
    
    void deleteLeaveRequest(Long id);
}

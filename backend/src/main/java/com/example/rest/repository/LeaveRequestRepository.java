package com.example.rest.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.rest.model.LeaveRequest;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    @Query("SELECT l FROM LeaveRequest l WHERE l.employee.id = :employeeId " +
        "AND l.status = 'APPROVED' AND :date BETWEEN l.startDate AND l.endDate")
    List<LeaveRequest> findApprovedLeaveByEmployeeAndDate(@Param("employeeId") Long employeeId,
                                                           @Param("date") LocalDate date);
}


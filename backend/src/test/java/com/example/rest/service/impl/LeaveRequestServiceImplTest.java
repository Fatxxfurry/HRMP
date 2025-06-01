package com.example.rest.service.impl;

import com.example.rest.model.Department;
import com.example.rest.model.Employee;
import com.example.rest.model.LeaveRequest;
import com.example.rest.model.enums.RequestStatus;
import com.example.rest.repository.DepartmentRepository;
import com.example.rest.repository.EmployeeRepository;
import com.example.rest.repository.LeaveRequestRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LeaveRequestServiceImplTest {

    @Mock
    private LeaveRequestRepository leaveRequestRepository;

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private DepartmentRepository departmentRepository;

    @InjectMocks
    private LeaveRequestServiceImpl leaveRequestService;

    private LeaveRequest leaveRequest;
    private Employee employee;
    private Department department;

    @BeforeEach
    void setUp() {
        employee = new Employee();
        employee.setId(1L);
        employee.setName("Nguyen Van A");

        department = new Department();
        department.setId(1L);
        department.setName("IT");

        leaveRequest = new LeaveRequest();
        leaveRequest.setId(1L);
        leaveRequest.setEmployee(employee);
        leaveRequest.setDepartment(department);
        leaveRequest.setStartDate(LocalDate.of(2025, 6, 1));
        leaveRequest.setEndDate(LocalDate.of(2025, 6, 2));
        leaveRequest.setReason("Vacation");
        leaveRequest.setStatus(RequestStatus.PENDING);
    }

    @Test
    void testGetAllLeaveRequests() {
        when(leaveRequestRepository.findAll()).thenReturn(Arrays.asList(leaveRequest));
        List<LeaveRequest> result = leaveRequestService.getAllLeaveRequests();
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(leaveRequest, result.get(0));
        verify(leaveRequestRepository).findAll();
    }

    @Test
    void testGetLeaveRequestById_Success() {
        when(leaveRequestRepository.findById(1L)).thenReturn(Optional.of(leaveRequest));
        LeaveRequest result = leaveRequestService.getLeaveRequestById(1L);
        assertNotNull(result);
        assertEquals(leaveRequest, result);
        verify(leaveRequestRepository).findById(1L);
    }

    @Test
    void testGetLeaveRequestById_NotFound() {
        when(leaveRequestRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(NoSuchElementException.class, () -> leaveRequestService.getLeaveRequestById(1L));
        verify(leaveRequestRepository).findById(1L);
    }

    @Test
    void testCreateLeaveRequest_Success() {
        LeaveRequest inputLeaveRequest = new LeaveRequest();
        inputLeaveRequest.setEmployee(employee);
        inputLeaveRequest.setDepartment(department);
        inputLeaveRequest.setStartDate(LocalDate.of(2025, 6, 1));
        inputLeaveRequest.setEndDate(LocalDate.of(2025, 6, 2));
        inputLeaveRequest.setReason("Vacation");
        inputLeaveRequest.setStatus(RequestStatus.PENDING);

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(leaveRequestRepository.save(inputLeaveRequest)).thenReturn(leaveRequest);

        LeaveRequest result = leaveRequestService.createLeaveRequest(inputLeaveRequest);
        assertNotNull(result);
        assertEquals(employee, result.getEmployee());
        assertEquals(department, result.getDepartment());
        assertEquals("Vacation", result.getReason());
        verify(employeeRepository).findById(1L);
        verify(departmentRepository).findById(1L);
        verify(leaveRequestRepository).save(inputLeaveRequest);
    }

    @Test
    void testCreateLeaveRequest_EmployeeNotFound() {
        LeaveRequest inputLeaveRequest = new LeaveRequest();
        Employee invalidEmployee = new Employee();
        invalidEmployee.setId(1L);
        inputLeaveRequest.setEmployee(invalidEmployee);
        inputLeaveRequest.setDepartment(department);
        inputLeaveRequest.setStartDate(LocalDate.of(2025, 6, 1));

        when(employeeRepository.findById(1L)).thenReturn(Optional.empty());
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(leaveRequestRepository.save(inputLeaveRequest)).thenReturn(inputLeaveRequest);

        LeaveRequest result = leaveRequestService.createLeaveRequest(inputLeaveRequest);
        assertNotNull(result);
        assertNull(result.getEmployee());
        assertEquals(department, result.getDepartment());
        verify(employeeRepository).findById(1L);
        verify(departmentRepository).findById(1L);
        verify(leaveRequestRepository).save(inputLeaveRequest);
    }

    @Test
    void testCreateLeaveRequest_DepartmentNotFound() {
        LeaveRequest inputLeaveRequest = new LeaveRequest();
        inputLeaveRequest.setEmployee(employee);
        Department invalidDepartment = new Department();
        invalidDepartment.setId(1L);
        inputLeaveRequest.setDepartment(invalidDepartment);
        inputLeaveRequest.setStartDate(LocalDate.of(2025, 6, 1));

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(departmentRepository.findById(1L)).thenReturn(Optional.empty());
        when(leaveRequestRepository.save(inputLeaveRequest)).thenReturn(inputLeaveRequest);

        LeaveRequest result = leaveRequestService.createLeaveRequest(inputLeaveRequest);
        assertNotNull(result);
        assertEquals(employee, result.getEmployee());
        assertNull(result.getDepartment());
        verify(employeeRepository).findById(1L);
        verify(departmentRepository).findById(1L);
        verify(leaveRequestRepository).save(inputLeaveRequest);
    }

    @Test
    void testCreateLeaveRequest_NullInput() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            leaveRequestService.createLeaveRequest(null);
        });
        assertEquals("Leave request cannot be null", exception.getMessage());
        verify(leaveRequestRepository, never()).save(any());
        verify(employeeRepository, never()).findById(anyLong());
        verify(departmentRepository, never()).findById(anyLong());
    }

    @Test
    void testUpdateLeaveRequest_Success() {
        LeaveRequest updatedLeaveRequest = new LeaveRequest();
        updatedLeaveRequest.setStartDate(LocalDate.of(2025, 6, 3));
        updatedLeaveRequest.setEndDate(LocalDate.of(2025, 6, 4));
        updatedLeaveRequest.setReason("Sick leave");
        updatedLeaveRequest.setStatus(RequestStatus.APPROVED);

        when(leaveRequestRepository.findById(1L)).thenReturn(Optional.of(leaveRequest));
        when(leaveRequestRepository.save(leaveRequest)).thenReturn(leaveRequest);

        LeaveRequest result = leaveRequestService.updateLeaveRequest(1L, updatedLeaveRequest);
        assertNotNull(result);
        assertEquals(LocalDate.of(2025, 6, 3), result.getStartDate());
        assertEquals(LocalDate.of(2025, 6, 4), result.getEndDate());
        assertEquals("Sick leave", result.getReason());
        assertEquals(RequestStatus.APPROVED, result.getStatus());
        verify(leaveRequestRepository).findById(1L);
        verify(leaveRequestRepository).save(leaveRequest);
    }

    @Test
    void testUpdateLeaveRequest_PartialUpdate() {
        LeaveRequest updatedLeaveRequest = new LeaveRequest();
        updatedLeaveRequest.setReason("Personal leave");

        when(leaveRequestRepository.findById(1L)).thenReturn(Optional.of(leaveRequest));
        when(leaveRequestRepository.save(leaveRequest)).thenReturn(leaveRequest);

        LeaveRequest result = leaveRequestService.updateLeaveRequest(1L, updatedLeaveRequest);
        assertNotNull(result);
        assertEquals(LocalDate.of(2025, 6, 1), result.getStartDate());
        assertEquals("Personal leave", result.getReason());
        assertEquals(RequestStatus.PENDING, result.getStatus());
        verify(leaveRequestRepository).findById(1L);
        verify(leaveRequestRepository).save(leaveRequest);
    }

    @Test
    void testUpdateLeaveRequest_NotFound() {
        LeaveRequest updatedLeaveRequest = new LeaveRequest();
        when(leaveRequestRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(NoSuchElementException.class, () -> leaveRequestService.updateLeaveRequest(1L, updatedLeaveRequest));
        verify(leaveRequestRepository).findById(1L);
        verify(leaveRequestRepository, never()).save(any());
    }

    @Test
    void testDeleteLeaveRequest() {
        doNothing().when(leaveRequestRepository).deleteById(1L);
        leaveRequestService.deleteLeaveRequest(1L);
        verify(leaveRequestRepository).deleteById(1L);
    }

    @Test
    void testCreateLeaveRequest_NullEmployee() {
        LeaveRequest inputLeaveRequest = new LeaveRequest();
        inputLeaveRequest.setEmployee(null);
        inputLeaveRequest.setDepartment(department);
        inputLeaveRequest.setStartDate(LocalDate.of(2025, 6, 1));

        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(leaveRequestRepository.save(inputLeaveRequest)).thenReturn(inputLeaveRequest);

        LeaveRequest result = leaveRequestService.createLeaveRequest(inputLeaveRequest);
        assertNotNull(result);
        assertNull(result.getEmployee());
        assertEquals(department, result.getDepartment());
        verify(employeeRepository, never()).findById(anyLong());
        verify(departmentRepository).findById(1L);
        verify(leaveRequestRepository).save(inputLeaveRequest);
    }

    @Test
    void testCreateLeaveRequest_NullDepartment() {
        LeaveRequest inputLeaveRequest = new LeaveRequest();
        inputLeaveRequest.setEmployee(employee);
        inputLeaveRequest.setDepartment(null);
        inputLeaveRequest.setStartDate(LocalDate.of(2025, 6, 1));

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(leaveRequestRepository.save(inputLeaveRequest)).thenReturn(inputLeaveRequest);

        LeaveRequest result = leaveRequestService.createLeaveRequest(inputLeaveRequest);
        assertNotNull(result);
        assertEquals(employee, result.getEmployee());
        assertNull(result.getDepartment());
        verify(employeeRepository).findById(1L);
        verify(departmentRepository, never()).findById(anyLong());
        verify(leaveRequestRepository).save(inputLeaveRequest);
    }
}
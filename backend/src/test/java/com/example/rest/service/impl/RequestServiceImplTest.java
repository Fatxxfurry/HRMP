package com.example.rest.service.impl;

import com.example.rest.model.Request;
import com.example.rest.model.Employee;
import com.example.rest.model.Department;
import com.example.rest.model.enums.RequestStatus;
import com.example.rest.repository.RequestRepository;
import com.example.rest.repository.EmployeeRepository;
import com.example.rest.repository.DepartmentRepository;
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
public class RequestServiceImplTest {

    @Mock
    private RequestRepository requestRepository;

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private DepartmentRepository departmentRepository;

    @InjectMocks
    private RequestServiceImpl requestService;

    private Request request;
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

        request = new Request();
        request.setId(1L);
        request.setName("Resource Request");
        request.setRequestDate(LocalDate.of(2025, 6, 1));
        request.setDescription("Need new laptop");
        request.setEmployee(employee);
        request.setDepartment(department);
        request.setStatus(RequestStatus.PENDING);
    }

    @Test
    void testGetAllRequests() {
        when(requestRepository.findAll()).thenReturn(Arrays.asList(request));
        List<Request> result = requestService.getAllRequests();
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(request, result.get(0));
        verify(requestRepository).findAll();
    }

    @Test
    void testGetRequestById_Success() {
        when(requestRepository.findById(1L)).thenReturn(Optional.of(request));
        Request result = requestService.getRequestById(1L);
        assertNotNull(result);
        assertEquals(request, result);
        verify(requestRepository).findById(1L);
    }

    @Test
    void testGetRequestById_NotFound() {
        when(requestRepository.findById(1L)).thenReturn(Optional.empty());
        Request result = requestService.getRequestById(1L);
        assertNull(result);
        verify(requestRepository).findById(1L);
    }

    @Test
    void testCreateRequest_Success() {
        Request inputRequest = new Request();
        inputRequest.setEmployee(employee);
        inputRequest.setDepartment(department);
        inputRequest.setName("Resource Request");
        inputRequest.setRequestDate(LocalDate.of(2025, 6, 1));
        inputRequest.setDescription("Need new laptop");
        inputRequest.setStatus(RequestStatus.PENDING);

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(requestRepository.save(inputRequest)).thenReturn(request);

        Request result = requestService.createRequest(inputRequest);
        assertNotNull(result);
        assertEquals(employee, result.getEmployee());
        assertEquals(department, result.getDepartment());
        assertEquals("Resource Request", result.getName());
        verify(employeeRepository).findById(1L);
        verify(departmentRepository).findById(1L);
        verify(requestRepository).save(inputRequest);
    }

    @Test
    void testCreateRequest_EmployeeNotFound() {
        Request inputRequest = new Request();
        Employee invalidEmployee = new Employee();
        invalidEmployee.setId(1L);
        inputRequest.setEmployee(invalidEmployee);
        inputRequest.setDepartment(department);
        inputRequest.setName("Resource Request");

        when(employeeRepository.findById(1L)).thenReturn(Optional.empty());
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(requestRepository.save(inputRequest)).thenReturn(inputRequest);

        Request result = requestService.createRequest(inputRequest);
        assertNotNull(result);
        assertNull(result.getEmployee());
        assertEquals(department, result.getDepartment());
        verify(employeeRepository).findById(1L);
        verify(departmentRepository).findById(1L);
        verify(requestRepository).save(inputRequest);
    }

    @Test
    void testCreateRequest_DepartmentNotFound() {
        Request inputRequest = new Request();
        inputRequest.setEmployee(employee);
        Department invalidDepartment = new Department();
        invalidDepartment.setId(1L);
        inputRequest.setDepartment(invalidDepartment);
        inputRequest.setName("Resource Request");

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(departmentRepository.findById(1L)).thenReturn(Optional.empty());
        when(requestRepository.save(inputRequest)).thenReturn(inputRequest);

        Request result = requestService.createRequest(inputRequest);
        assertNotNull(result);
        assertEquals(employee, result.getEmployee());
        assertNull(result.getDepartment());
        verify(employeeRepository).findById(1L);
        verify(departmentRepository).findById(1L);
        verify(requestRepository).save(inputRequest);
    }

    @Test
    void testCreateRequest_NullInput() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            requestService.createRequest(null);
        });
        assertEquals("Request cannot be null", exception.getMessage());
        verify(requestRepository, never()).save(any());
        verify(employeeRepository, never()).findById(anyLong());
        verify(departmentRepository, never()).findById(anyLong());
    }

    @Test
    void testCreateRequest_NullEmployee() {
        Request inputRequest = new Request();
        inputRequest.setEmployee(null);
        inputRequest.setDepartment(department);
        inputRequest.setName("Resource Request");
        inputRequest.setRequestDate(LocalDate.of(2025, 6, 1));

        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(requestRepository.save(inputRequest)).thenReturn(inputRequest);

        Request result = requestService.createRequest(inputRequest);
        assertNotNull(result);
        assertNull(result.getEmployee());
        assertEquals(department, result.getDepartment());
        verify(employeeRepository, never()).findById(anyLong());
        verify(departmentRepository).findById(1L);
        verify(requestRepository).save(inputRequest);
    }

    @Test
    void testCreateRequest_NullDepartment() {
        Request inputRequest = new Request();
        inputRequest.setEmployee(employee);
        inputRequest.setDepartment(null);
        inputRequest.setName("Resource Request");
        inputRequest.setRequestDate(LocalDate.of(2025, 6, 1));

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(requestRepository.save(inputRequest)).thenReturn(inputRequest);

        Request result = requestService.createRequest(inputRequest);
        assertNotNull(result);
        assertEquals(employee, result.getEmployee());
        assertNull(result.getDepartment());
        verify(employeeRepository).findById(1L);
        verify(departmentRepository, never()).findById(anyLong());
        verify(requestRepository).save(inputRequest);
    }

    @Test
    void testUpdateRequest_Success() {
        Request updatedRequest = new Request();
        updatedRequest.setName("Updated Request");
        updatedRequest.setRequestDate(LocalDate.of(2025, 6, 2));
        updatedRequest.setDescription("Updated description");
        updatedRequest.setEmployee(employee);
        updatedRequest.setDepartment(department);
        updatedRequest.setStatus(RequestStatus.APPROVED);

        when(requestRepository.findById(1L)).thenReturn(Optional.of(request));
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(requestRepository.save(request)).thenReturn(request);

        Request result = requestService.updateRequest(1L, updatedRequest);
        assertNotNull(result);
        assertEquals("Updated Request", result.getName());
        assertEquals(LocalDate.of(2025, 6, 2), result.getRequestDate());
        assertEquals("Updated description", result.getDescription());
        assertEquals(employee, result.getEmployee());
        assertEquals(department, result.getDepartment());
        assertEquals(RequestStatus.APPROVED, result.getStatus());
        verify(requestRepository).findById(1L);
        verify(employeeRepository).findById(1L);
        verify(departmentRepository).findById(1L);
        verify(requestRepository).save(request);
    }

    @Test
    void testUpdateRequest_PartialUpdate() {
        Request updatedRequest = new Request();
        updatedRequest.setName("Partial Update");
        updatedRequest.setDescription("Partial description");

        when(requestRepository.findById(1L)).thenReturn(Optional.of(request));
        when(requestRepository.save(request)).thenReturn(request);

        Request result = requestService.updateRequest(1L, updatedRequest);
        assertNotNull(result);
        assertEquals("Partial Update", result.getName());
        assertEquals("Partial description", result.getDescription());
        assertEquals(LocalDate.of(2025, 6, 1), result.getRequestDate());
        assertEquals(employee, result.getEmployee());
        assertEquals(department, result.getDepartment());
        assertEquals(RequestStatus.PENDING, result.getStatus());
        verify(requestRepository).findById(1L);
        verify(employeeRepository, never()).findById(anyLong());
        verify(departmentRepository, never()).findById(anyLong());
        verify(requestRepository).save(request);
    }

    @Test
    void testUpdateRequest_NotFound() {
        Request updatedRequest = new Request();
        when(requestRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(NoSuchElementException.class, () -> requestService.updateRequest(1L, updatedRequest));
        verify(requestRepository).findById(1L);
        verify(requestRepository, never()).save(any());
    }

    @Test
    void testDeleteRequest() {
        doNothing().when(requestRepository).deleteById(1L);
        requestService.deleteRequest(1L);
        verify(requestRepository).deleteById(1L);
    }
}
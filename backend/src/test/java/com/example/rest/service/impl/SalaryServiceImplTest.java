package com.example.rest.service.impl;

import com.example.rest.model.Salary;
import com.example.rest.model.Employee;
import com.example.rest.repository.SalaryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SalaryServiceImplTest {

    @Mock
    private SalaryRepository salaryRepository;

    @InjectMocks
    private SalaryServiceImpl salaryService;

    private Salary salary;
    private Employee employee;

    @BeforeEach
    void setUp() {
        employee = new Employee();
        employee.setId(1L);
        employee.setName("Nguyen Van A");

        salary = new Salary();
        salary.setId(1L);
        salary.setBasic_salary(10000000);
        salary.setBonus(2000000);
        salary.setMinus(500000);
        salary.setBonus_reason("Good performance");
        salary.setMinus_reason("Late attendance");
        salary.setDate_paid(LocalDate.of(2025, 6, 1));
        salary.setEmployee(employee);
    }

    @Test
    void testGetAllSalaries() {
        when(salaryRepository.findAll()).thenReturn(Arrays.asList(salary));
        List<Salary> result = salaryService.getAllSalaries();
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(salary, result.get(0));
        verify(salaryRepository).findAll();
    }

    @Test
    void testGetSalaryById_Success() {
        when(salaryRepository.findById(1L)).thenReturn(Optional.of(salary));
        Salary result = salaryService.getSalaryById(1L);
        assertNotNull(result);
        assertEquals(salary, result);
        verify(salaryRepository).findById(1L);
    }

    @Test
    void testGetSalaryById_NotFound() {
        when(salaryRepository.findById(1L)).thenReturn(Optional.empty());
        Salary result = salaryService.getSalaryById(1L);
        assertNull(result);
        verify(salaryRepository).findById(1L);
    }

    @Test
    void testCreateSalary_Success() {
        Salary inputSalary = new Salary();
        inputSalary.setBasic_salary(10000000);
        inputSalary.setBonus(2000000);
        inputSalary.setMinus(500000);
        inputSalary.setBonus_reason("Good performance");
        inputSalary.setEmployee(employee);

        when(salaryRepository.save(inputSalary)).thenReturn(salary);

        Salary result = salaryService.createSalary(inputSalary);
        assertNotNull(result);
        assertEquals(10000000, result.getBasic_salary());
        assertEquals(employee, result.getEmployee());
        verify(salaryRepository).save(inputSalary);
    }

    @Test
    void testCreateSalary_NullInput() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            salaryService.createSalary(null);
        });
        assertEquals("Salary cannot be null", exception.getMessage());
        verify(salaryRepository, never()).save(any());
    }

    @Test
    void testUpdateSalary_Success() {
        Salary updatedSalary = new Salary();
        updatedSalary.setBasic_salary(12000000);
        updatedSalary.setBonus(3000000);
        updatedSalary.setMinus(1000000);
        updatedSalary.setBonus_reason("Excellent performance");
        updatedSalary.setMinus_reason("None");
        updatedSalary.setDate_paid(LocalDate.of(2025, 7, 1));

        when(salaryRepository.findById(1L)).thenReturn(Optional.of(salary));
        when(salaryRepository.save(salary)).thenReturn(salary);

        Salary result = salaryService.updateSalary(1L, updatedSalary);
        assertNotNull(result);
        assertEquals(12000000, result.getBasic_salary());
        assertEquals(3000000, result.getBonus());
        assertEquals("Excellent performance", result.getBonus_reason());
        verify(salaryRepository).findById(1L);
        verify(salaryRepository).save(salary);
    }

    @Test
    void testUpdateSalary_PartialUpdate() {
        Salary updatedSalary = new Salary();
        updatedSalary.setBasic_salary(15000000);
        updatedSalary.setBonus_reason("Team contribution");

        when(salaryRepository.findById(1L)).thenReturn(Optional.of(salary));
        when(salaryRepository.save(salary)).thenReturn(salary);

        Salary result = salaryService.updateSalary(1L, updatedSalary);
        assertNotNull(result);
        assertEquals(15000000, result.getBasic_salary());
        assertEquals("Team contribution", result.getBonus_reason());
        assertEquals(500000, result.getMinus()); // Không thay đổi
        verify(salaryRepository).findById(1L);
        verify(salaryRepository).save(salary);
    }

    @Test
    void testUpdateSalary_NotFound() {
        Salary updatedSalary = new Salary();
        when(salaryRepository.findById(1L)).thenReturn(Optional.empty());
        Salary result = salaryService.updateSalary(1L, updatedSalary);
        assertNull(result);
        verify(salaryRepository).findById(1L);
        verify(salaryRepository, never()).save(any());
    }

    @Test
    void testUpdateSalary_NullInput() {
        when(salaryRepository.findById(1L)).thenReturn(Optional.of(salary));
        Salary result = salaryService.updateSalary(1L, null);
        assertNotNull(result);
        assertEquals(salary, result); // Không thay đổi
        verify(salaryRepository).findById(1L);
        verify(salaryRepository).save(salary);
    }

    @Test
    void testDeleteSalary() {
        doNothing().when(salaryRepository).deleteById(1L);
        salaryService.deleteSalary(1L);
        verify(salaryRepository).deleteById(1L);
    }

    @Test
    void testGetTotalSalary() {
        assertEquals(11500000, salary.getTotal_salary()); // 10000000 + 2000000 - 500000
        verifyNoInteractions(salaryRepository);
    }

    @Test
    void testGetTotalSalary_NullFields() {
        Salary nullSalary = new Salary();
        nullSalary.setBasic_salary(null);
        nullSalary.setBonus(null);
        nullSalary.setMinus(null);
        assertEquals(0, nullSalary.getTotal_salary()); // 0 + 0 - 0
        verifyNoInteractions(salaryRepository);
    }
}
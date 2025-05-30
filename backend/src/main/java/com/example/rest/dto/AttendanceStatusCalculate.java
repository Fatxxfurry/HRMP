package com.example.rest.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.example.rest.model.Employee;

public class AttendanceStatusCalculate {
    private LocalDate date;
    private LocalTime localTime;
    private Employee employee;

    public AttendanceStatusCalculate(LocalDate date, LocalTime localTime, Employee employee) {
        this.date = date;
        this.localTime = localTime;
        this.employee = employee;
    }
    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    public LocalTime getLocalTime() {
        return localTime;
    }
    public void setLocalTime(LocalTime localTime) {
        this.localTime = localTime;
    }
    public Employee getEmployee() {
        return employee;
    }
    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}

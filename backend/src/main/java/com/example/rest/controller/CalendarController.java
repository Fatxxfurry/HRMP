package com.example.rest.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.rest.model.Calendar;
import com.example.rest.service.CalendarService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;

@RestController
@RequestMapping("/api/calendars")
public class CalendarController {
    @Autowired
    private CalendarService calendarService;

    @GetMapping("/month")
    public List<Calendar> getCalendarForMonth(@RequestParam int year, @RequestParam int month) {
        return calendarService.getCalendarForMonth(year, month);
    }

    @PostMapping("/create/month")
    public void createCalendarForMonth(@RequestParam int year, @RequestParam int month) {
        calendarService.createCalendarForMonth(year, month);
    }

    @PutMapping("/update/day/{id}")
    public void updateCalendarForDay(@PathVariable Long id) {
        calendarService.updateCalendarForDay(calendarService.getCalendarById(id));
    }

    @DeleteMapping("/delete/month")
    public void deleteCalendarForMonth(@RequestParam int year, @RequestParam int month) {
        calendarService.deleteCalendarForMonth(year, month);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteCalendar(@PathVariable Long id) {
        calendarService.deleteCalendar(id);
    }
 

    @GetMapping("/")
    public List<Calendar> getAllCalendar() {
        return calendarService.getAllCalendar();
    }

}
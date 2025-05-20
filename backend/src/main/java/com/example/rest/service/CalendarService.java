package com.example.rest.service;

import java.util.List;

import com.example.rest.model.Calendar;

public interface CalendarService {

    List<Calendar> getCalendarForMonth(int year, int month);

    void createCalendarForMonth(int year, int month);

    void updateCalendarForDay(Calendar calendar);

    void deleteCalendarForMonth(int year, int month);

    void deleteCalendar(Long id);

    List<Calendar> getAllCalendar();

    Calendar getCalendarById(Long id);
}

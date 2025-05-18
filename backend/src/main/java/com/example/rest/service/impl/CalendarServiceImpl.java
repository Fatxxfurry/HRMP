package com.example.rest.service.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rest.model.Calendar;
import com.example.rest.repository.CalendarRepository;
import com.example.rest.service.CalendarService;
// public interface CalendarService {

//     List<Calendar> getCalendarForMonth(int year, int month);

//     void createCalendarForMonth(int year, int month);

//     void updateCalendarForDay(Calendar calendar);

//     void deleteCalendarForMonth(int year, int month);

//     void deleteCalendar(Long id);
// }
@Service
public class CalendarServiceImpl implements CalendarService {
    
    @Autowired
    private CalendarRepository calendarRepository;

    @Override
    public List<Calendar> getCalendarForMonth(int year, int month) {
        return calendarRepository.getCalendarForMonth(year, month);
    }

    @Override
    public void createCalendarForMonth(int year, int month) {
        calendarRepository.insertCalendarForMonth(year, month);
    }

    @Override
    public void updateCalendarForDay(Calendar calendar) {
        calendarRepository.updateCalendarForDay(calendar.getWorkDate().getYear(), calendar.getWorkDate().getMonthValue(), calendar.getWorkDate().getDayOfMonth(), calendar.getIsWorkingDay(), calendar.getDescription());
    }

    @Override
    public void deleteCalendarForMonth(int year, int month) {
        calendarRepository.deleteCalendarForMonth(year, month);
    }

    @Override
    public void deleteCalendar(Long id) {
        calendarRepository.deleteById(id);
    }

    @Override
    public List<Calendar> getAllCalendar() {
        return calendarRepository.findAll();
    }

    @Override
    public Calendar getCalendarById(Long id) {
        return calendarRepository.findById(id).get();
    }
}

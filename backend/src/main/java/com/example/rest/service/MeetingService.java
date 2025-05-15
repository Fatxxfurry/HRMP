package com.example.rest.service;

import java.util.List;

import com.example.rest.model.Meeting;

public interface MeetingService {
    
    List<Meeting> getAllMeetings();
    
    Meeting getMeetingById(Long id);
    
    Meeting createMeeting(Meeting meeting);
    
    Meeting updateMeeting(Long id, Meeting meeting);
    
    void deleteMeeting(Long id);
    
}


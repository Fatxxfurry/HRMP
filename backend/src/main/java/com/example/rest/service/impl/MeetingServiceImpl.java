package com.example.rest.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rest.model.Meeting;
import com.example.rest.repository.MeetingRepository;
import com.example.rest.service.MeetingService;

@Service
public class MeetingServiceImpl implements MeetingService {

    private final MeetingRepository meetingRepository;

    @Autowired
    public MeetingServiceImpl(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    @Override
    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }

    @Override
    public Meeting getMeetingById(Long id) {
        return meetingRepository.findById(id).orElse(null);
    }

    @Override
    public Meeting createMeeting(Meeting meeting) {
        return meetingRepository.save(meeting);
    }

    @Override
    public Meeting updateMeeting(Long id, Meeting meeting) {
        Meeting existingMeeting = getMeetingById(id);
        if (existingMeeting == null) {
            return null;
        }
        if (meeting.getSubject() != null) {
            existingMeeting.setSubject(meeting.getSubject());
        }
        if (meeting.getDescription() != null) {
            existingMeeting.setDescription(meeting.getDescription());
        }
        if (meeting.getDate() != null) {
            existingMeeting.setDate(meeting.getDate());
        }
        return meetingRepository.save(existingMeeting);
    }

    @Override
    public void deleteMeeting(Long id) {
        meetingRepository.deleteById(id);
    }
}


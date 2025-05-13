package com.hrmp.service;

import com.hrmp.dto.NotificationDTO;
import com.hrmp.entity.Notification;
import com.hrmp.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Transactional
    public NotificationDTO createNotification(NotificationDTO notificationDTO) {
        Notification notification = new Notification();
        notification.setManagerId(notificationDTO.getManagerId());
        notification.setEmployeeId(notificationDTO.getEmployeeId());
        notification.setPostBy(notificationDTO.getPostBy());
        notification.setContent(notificationDTO.getContent());
        notification.setTo(notificationDTO.getTo());
        notification.setType(notificationDTO.getType());
        
        Notification savedNotification = notificationRepository.save(notification);
        return convertToDTO(savedNotification);
    }

    public List<NotificationDTO> getNotificationsByEmployeeId(Long employeeId) {
        return notificationRepository.findByEmployeeId(employeeId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<NotificationDTO> getNotificationsByManagerId(Long managerId) {
        return notificationRepository.findByManagerId(managerId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<NotificationDTO> getUnreadNotificationsByEmployeeId(Long employeeId) {
        return notificationRepository.findByEmployeeIdAndIsRead(employeeId, false)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void markNotificationAsRead(Long notificationId) {
        notificationRepository.findById(notificationId).ifPresent(notification -> {
            notification.setRead(true);
            notificationRepository.save(notification);
        });
    }

    @Transactional
    public void markAllNotificationsAsRead(Long employeeId) {
        List<Notification> notifications = notificationRepository.findByEmployeeIdAndIsRead(employeeId, false);
        notifications.forEach(notification -> notification.setRead(true));
        notificationRepository.saveAll(notifications);
    }

    private NotificationDTO convertToDTO(Notification notification) {
        NotificationDTO dto = new NotificationDTO();
        dto.setNotificationId(notification.getNotificationId());
        dto.setManagerId(notification.getManagerId());
        dto.setEmployeeId(notification.getEmployeeId());
        dto.setPostBy(notification.getPostBy());
        dto.setContent(notification.getContent());
        dto.setTo(notification.getTo());
        dto.setType(notification.getType());
        dto.setCreatedAt(notification.getCreatedAt());
        dto.setRead(notification.isRead());
        return dto;
    }
} 
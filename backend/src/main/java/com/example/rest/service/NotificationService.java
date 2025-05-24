package com.example.rest.service;

import com.example.rest.dto.NotificationDTO;
import com.example.rest.model.Employee;
import com.example.rest.model.Notification;
import com.example.rest.model.Notification.NotificationStatus;
import com.example.rest.model.Notification.NotificationType;
import com.example.rest.repository.EmployeeRepository;
import com.example.rest.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final EmployeeRepository employeeRepository;

    @Transactional
    public NotificationDTO createNotification(NotificationDTO notificationDTO) {
        Employee employee = employeeRepository.findById(notificationDTO.getEmployeeId())
            .orElseThrow(() -> new RuntimeException("Employee not found"));

        Notification notification = new Notification();
        notification.setEmployee(employee);
        notification.setNotificationContent(notificationDTO.getNotificationContent());
        notification.setNotificationType(notificationDTO.getNotificationType());
        notification.setStatus(NotificationStatus.UNREAD);
        notification.setTitle(notificationDTO.getTitle());
        Notification savedNotification = notificationRepository.save(notification);
        return convertToDTO(savedNotification);
    }

    @Transactional(readOnly = true)
    public List<NotificationDTO> getNotificationsByEmployee(Long employeeId) {
        return notificationRepository.findByEmployeeId(employeeId)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<NotificationDTO> getUnreadNotificationsByEmployee(Long employeeId) {
        return notificationRepository.findByEmployeeIdAndStatus(employeeId, NotificationStatus.UNREAD)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<NotificationDTO> getNotificationsByType(Long employeeId, NotificationType type) {
        return notificationRepository.findByEmployeeIdAndNotificationType(employeeId, type)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Transactional
    public NotificationDTO markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
            .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setStatus(NotificationStatus.READ);
        return convertToDTO(notificationRepository.save(notification));
    }

    @Transactional
    public void markAllAsRead(Long employeeId) {
        List<Notification> unreadNotifications = notificationRepository.findByEmployeeIdAndStatus(
            employeeId, NotificationStatus.UNREAD);
        unreadNotifications.forEach(notification -> notification.setStatus(NotificationStatus.READ));
        notificationRepository.saveAll(unreadNotifications);
    }

    @Transactional(readOnly = true)
    public Long getUnreadCount(Long employeeId) {
        return notificationRepository.countUnreadNotifications(employeeId);
    }

    @Transactional(readOnly = true)
    public List<NotificationDTO> getLatestNotifications(Long employeeId, NotificationStatus status) {
        return notificationRepository.findLatestNotificationsByEmployeeAndStatus(employeeId, status)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    private NotificationDTO convertToDTO(Notification notification) {
        NotificationDTO dto = new NotificationDTO();
        dto.setId(notification.getId());
        dto.setEmployeeId(notification.getEmployee().getId());
        dto.setEmployeeName(notification.getEmployee().getName());
        dto.setNotificationContent(notification.getNotificationContent());
        dto.setNotificationType(notification.getNotificationType());
        dto.setStatus(notification.getStatus());
        dto.setCreatedAt(notification.getCreatedAt());
        dto.setUpdatedAt(notification.getUpdatedAt());
        dto.setTitle(notification.getTitle());
        return dto;
    }
} 
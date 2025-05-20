package com.example.rest.dto;

import com.example.rest.model.Notification.NotificationStatus;
import com.example.rest.model.Notification.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
    private Long id;
    private Long employeeId;
    private String employeeName;
    private String notificationContent;
    private NotificationType notificationType;
    private NotificationStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 
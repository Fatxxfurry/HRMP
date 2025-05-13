package com.hrmp.dto;

import com.hrmp.entity.Notification.NotificationType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class NotificationDTO {
    private Long notificationId;
    
    @NotNull(message = "Manager ID is required")
    private Long managerId;
    
    @NotNull(message = "Employee ID is required")
    private Long employeeId;
    
    @NotNull(message = "Post by is required")
    private String postBy;
    
    @NotNull(message = "Content is required")
    private String content;
    
    @NotNull(message = "Recipient is required")
    private String to;
    
    @NotNull(message = "Notification type is required")
    private NotificationType type;
    
    private LocalDateTime createdAt;
    private boolean isRead;
} 
package com.hrmp.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
public class Notification {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long notificationId;
    
    @Column(name = "manager_id")
    private Long managerId;
    
    @Column(name = "employee_id")
    private Long employeeId;
    
    @Column(name = "post_by")
    private String postBy;
    
    @Column(name = "content")
    private String content;
    
    @Column(name = "recipient")
    private String to;
    
    @Column(name = "notification_type")
    @Enumerated(EnumType.STRING)
    private NotificationType type;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "is_read")
    private boolean isRead;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        isRead = false;
    }
    
    public enum NotificationType {
        WORK_SCHEDULE_CHANGE,
        MEETING_SCHEDULE,
        DISMISSAL,
        SALARY_PAYMENT,
        REPORT,
        POLICY_CHANGE
    }
} 
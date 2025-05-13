package com.hrmp.repository;

import com.hrmp.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByEmployeeId(Long employeeId);
    List<Notification> findByManagerId(Long managerId);
    List<Notification> findByEmployeeIdAndIsRead(Long employeeId, boolean isRead);
    List<Notification> findByManagerIdAndIsRead(Long managerId, boolean isRead);
    List<Notification> findByEmployeeIdAndType(Long employeeId, Notification.NotificationType type);
    List<Notification> findByManagerIdAndType(Long managerId, Notification.NotificationType type);
} 
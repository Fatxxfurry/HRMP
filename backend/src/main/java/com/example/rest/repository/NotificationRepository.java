package com.example.rest.repository;

import com.example.rest.model.Notification;
import com.example.rest.model.Notification.NotificationStatus;
import com.example.rest.model.Notification.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByEmployeeId(Long employeeId);
    
    List<Notification> findByEmployeeIdAndStatus(Long employeeId, NotificationStatus status);
    
    List<Notification> findByEmployeeIdAndNotificationType(Long employeeId, NotificationType type);
    
    @Query("SELECT n FROM Notification n WHERE n.employee.id = :employeeId AND n.status = :status ORDER BY n.createdAt DESC")
    List<Notification> findLatestNotificationsByEmployeeAndStatus(
        @Param("employeeId") Long employeeId,
        @Param("status") NotificationStatus status
    );
    
    @Query("SELECT COUNT(n) FROM Notification n WHERE n.employee.id = :employeeId AND n.status = 'UNREAD'")
    Long countUnreadNotifications(@Param("employeeId") Long employeeId);
} 
package com.example.rest.controller;

import com.example.rest.dto.NotificationDTO;
import com.example.rest.model.Notification.NotificationStatus;
import com.example.rest.model.Notification.NotificationType;
import com.example.rest.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @PostMapping
    public ResponseEntity<NotificationDTO> createNotification(@RequestBody NotificationDTO notificationDTO) {
        return ResponseEntity.ok(notificationService.createNotification(notificationDTO));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<NotificationDTO>> getNotificationsByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(notificationService.getNotificationsByEmployee(employeeId));
    }

    @GetMapping("/employee/{employeeId}/unread")
    public ResponseEntity<List<NotificationDTO>> getUnreadNotifications(@PathVariable Long employeeId) {
        return ResponseEntity.ok(notificationService.getUnreadNotificationsByEmployee(employeeId));
    }

    @GetMapping("/employee/{employeeId}/type/{type}")
    public ResponseEntity<List<NotificationDTO>> getNotificationsByType(
            @PathVariable Long employeeId,
            @PathVariable NotificationType type) {
        return ResponseEntity.ok(notificationService.getNotificationsByType(employeeId, type));
    }

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<NotificationDTO> markAsRead(@PathVariable Long notificationId) {
        return ResponseEntity.ok(notificationService.markAsRead(notificationId));
    }

    @PutMapping("/employee/{employeeId}/read-all")
    public ResponseEntity<Void> markAllAsRead(@PathVariable Long employeeId) {
        notificationService.markAllAsRead(employeeId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/employee/{employeeId}/unread/count")
    public ResponseEntity<Long> getUnreadCount(@PathVariable Long employeeId) {
        return ResponseEntity.ok(notificationService.getUnreadCount(employeeId));
    }

    @GetMapping("/employee/{employeeId}/latest")
    public ResponseEntity<List<NotificationDTO>> getLatestNotifications(
            @PathVariable Long employeeId,
            @RequestParam(defaultValue = "UNREAD") NotificationStatus status) {
        return ResponseEntity.ok(notificationService.getLatestNotifications(employeeId, status));
    }
} 
package com.example.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.rest.dto.NotificationDTO;
import com.example.rest.model.Notification.NotificationStatus;
import com.example.rest.model.Notification.NotificationType;
import com.example.rest.service.NotificationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin
public class NotificationController {
    @Autowired
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
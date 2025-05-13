package com.hrmp.controller;

import com.hrmp.dto.NotificationDTO;
import com.hrmp.service.NotificationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public ResponseEntity<NotificationDTO> createNotification(@Valid @RequestBody NotificationDTO notificationDTO) {
        return ResponseEntity.ok(notificationService.createNotification(notificationDTO));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<NotificationDTO>> getNotificationsByEmployeeId(@PathVariable Long employeeId) {
        return ResponseEntity.ok(notificationService.getNotificationsByEmployeeId(employeeId));
    }

    @GetMapping("/manager/{managerId}")
    public ResponseEntity<List<NotificationDTO>> getNotificationsByManagerId(@PathVariable Long managerId) {
        return ResponseEntity.ok(notificationService.getNotificationsByManagerId(managerId));
    }

    @GetMapping("/employee/{employeeId}/unread")
    public ResponseEntity<List<NotificationDTO>> getUnreadNotificationsByEmployeeId(@PathVariable Long employeeId) {
        return ResponseEntity.ok(notificationService.getUnreadNotificationsByEmployeeId(employeeId));
    }

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<Void> markNotificationAsRead(@PathVariable Long notificationId) {
        notificationService.markNotificationAsRead(notificationId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/employee/{employeeId}/read-all")
    public ResponseEntity<Void> markAllNotificationsAsRead(@PathVariable Long employeeId) {
        notificationService.markAllNotificationsAsRead(employeeId);
        return ResponseEntity.ok().build();
    }
} 
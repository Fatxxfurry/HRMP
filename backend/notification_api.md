# Notification API Documentation

Base URL: `http://localhost:8080/api/notifications`

---

## 1. Create Notification

**Endpoint:** `POST /api/notifications`

**Request Body:**
```json
{
  "managerId": 1,
  "employeeId": 1,
  "postBy": "HR Manager",
  "content": "Your work schedule has been updated",
  "to": "John Doe",
  "type": "WORK_SCHEDULE_CHANGE"
}
```
- `type` must be one of:
  - `WORK_SCHEDULE_CHANGE`
  - `MEETING_SCHEDULE`
  - `DISMISSAL`
  - `SALARY_PAYMENT`
  - `REPORT`
  - `POLICY_CHANGE`

**Response:**
```json
{
  "notificationId": 1,
  "managerId": 1,
  "employeeId": 1,
  "postBy": "HR Manager",
  "content": "Your work schedule has been updated",
  "to": "John Doe",
  "type": "WORK_SCHEDULE_CHANGE",
  "createdAt": "2025-05-13T13:00:00",
  "isRead": false
}
```

---

## 2. Get Notifications for Employee

**Endpoint:** `GET /api/notifications/employee/{employeeId}`

**Response:**
```json
[
  {
    "notificationId": 1,
    "managerId": 1,
    "employeeId": 1,
    "postBy": "HR Manager",
    "content": "Your work schedule has been updated",
    "to": "John Doe",
    "type": "WORK_SCHEDULE_CHANGE",
    "createdAt": "2025-05-13T13:00:00",
    "isRead": false
  }
]
```

---

## 3. Get Notifications for Manager

**Endpoint:** `GET /api/notifications/manager/{managerId}`

**Response:**
Same as above, but filtered by manager.

---

## 4. Get Unread Notifications for Employee

**Endpoint:** `GET /api/notifications/employee/{employeeId}/unread`

**Response:**
Same as above, but only unread notifications.

---

## 5. Mark Notification as Read

**Endpoint:** `PUT /api/notifications/{notificationId}/read`

**Response:**
- HTTP 200 OK (no body)

---

## 6. Mark All Notifications as Read for Employee

**Endpoint:** `PUT /api/notifications/employee/{employeeId}/read-all`

**Response:**
- HTTP 200 OK (no body)

---

---

## Example Notification Types
- `WORK_SCHEDULE_CHANGE`
- `MEETING_SCHEDULE`
- `DISMISSAL`
- `SALARY_PAYMENT`
- `REPORT`
- `POLICY_CHANGE`

---
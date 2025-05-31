// Employee Notification: Nhân viên xem các thông báo của công ty

"use client"
import * as React from 'react'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import NotificationHistory from '@/components/defined/NotificationHistory'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import axios from "axios"

interface Notification {
    id: number,
    employeeId: number,
    employeeName: string,
    notificationContent: string,
    notificationType: string,
    status: string,
    createdAt: string,
    title: string
}

interface EmployeeManager {
    id: number,
    department: {
        id: number,
        name: string,
        managerId: number,
    }
}

interface ManagerInfo {
    id: number,
    name: string,
    age: number,
    phone: string,
    birth_date: string,
    hire_date: string,
    email: string,
    address: string,
    position: string,
    identification: string,
    role: string,
    department: {
        id: number,
        name: string,
        managerId: number,
    }
}

export default function EmployeeNotification() {
    const [notificationList, setNotificationList] = useState<Notification[]>([])
    const [managerDetail, setManagerDetail] = useState<ManagerInfo | null>(null)
    const { user } = useAuth()

    useEffect(() => {
        if (user?.id) {
            fetchData(user.id)
        }
    }, [user])

    const fetchData = async (userId: number) => {
        try {
            // Lấy thông tin managerId từ nhân viên
            const empResponse = await axios.get(`http://localhost:8080/api/employees/${userId}`)
            const empData: EmployeeManager = empResponse.data
            const managerId = empData.department.managerId

            // Lấy danh sách thông báo từ manager đó
            const notifResponse = await axios.get(`http://localhost:8080/api/notifications/employee/${managerId}`)
            const notifs: Notification[] = notifResponse.data
            setNotificationList(notifs)

            // Lấy thông tin chi tiết manager
            const managerResponse = await axios.get(`http://localhost:8080/api/employees/${managerId}`)
            const managerData: ManagerInfo = managerResponse.data
            setManagerDetail(managerData)
        } catch (error) {
            console.error('Error loading data:', error)
        }
    }

    // Hàm format ngày giờ
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString)
        const dd = String(date.getDate()).padStart(2, '0')
        const mm = String(date.getMonth() + 1).padStart(2, '0')
        const yyyy = date.getFullYear()
        const hh = String(date.getHours()).padStart(2, '0')
        const min = String(date.getMinutes()).padStart(2, '0')
        const sec = String(date.getSeconds()).padStart(2, '0')
        return `${dd}/${mm}/${yyyy} ${hh}:${min}:${sec}`
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                {notificationList.length > 0 ? (
                    notificationList.map((notification) => (
                        <NotificationHistory
                            key={notification.id}
                            Header={notification.title}
                            Date={formatDateTime(notification.createdAt)}
                            Sender={managerDetail?.name || "Unknown"}
                            Content={notification.notificationContent}
                            Email={managerDetail?.email}
                            Department={managerDetail?.department?.name || "Unknown"}
                        />
                    ))
                ) : (
                    <div className="p-4 text-gray-500">No notifications found.</div>
                )}
            </div>
        </div>
    )
}
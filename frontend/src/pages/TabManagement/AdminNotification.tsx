//Admin Notification: Gửi và xem thông báo cho admin

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
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import NotificationHistory from '@/components/defined/NotificationHistory'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import axios from "axios"
interface notification {
    employeeId: number,
    notificationContent: string,
    notificationType: string,
    status: string,
    title: string,
    createdAt: string,
}
interface employee {
    id: number
    name: string
    email: string
    department: {
        id: number,
        name: string,
    }
}
export default function AdminNotification() {
    const [mynotification, setmynotification] = useState<notification[]>([]);
    const [myinformation, setmyinformation] = useState<employee | null>(null)
    const [newTitle, setNewtitle] = useState("")
    const [newContent, setNewcontent] = useState("")
    const [notificationType, setNewNotificationType] = useState('');

    const { user } = useAuth();
    useEffect(() => {
        if (user?.id) {
            loadmynotification()
            loadmyinformation()
        }
    }, [user])
    const loadmynotification = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/notifications/employee/${user?.id}`)
            if (!response) {
                throw new Error('Failed to fetch employee my notification info')
            }
            const data: notification[] = response.data
            console.log("my notification: ", data)
            setmynotification(data)
        } catch (error) {
            console.error('Error fetching my notification info:', error)
        }
    }
    const loadmyinformation = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/employees/${user?.id}`)
            if (!response) {
                throw new Error('Failed to fetch employee  info')
            }
            const data = response.data
            setmyinformation(data)
        } catch (error) {
            console.error('Error fetching employee  info:', error)
        }
    }
    const handleAdd = async () => {
        try {
            const payload = {
                employeeId: user?.id,
                notificationContent: newContent,
                notificationType: notificationType,
                status: "UNREAD",
                title: newTitle,
            }
            console.log("payload:", payload)
            const response = await axios.post("http://localhost:8080/api/notifications", payload);
            if (response.status === 201 || response.status === 200) {
                alert('Thông báo đã được tạo thành công!');
                setNewcontent('');
                setNewtitle('');
                setNewNotificationType('');
                loadmynotification(); // refresh the notification list
            } else {
                throw new Error('Lỗi khi gửi thông báo');
            }
        } catch (error) {
            console.error('Lỗi khi thêm thông báo:', error);
            alert('Gửi thông báo thất bại.');
        }
    }
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
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4" >
                <div>
                    <Label >Tiêu đề</Label>
                    <Input
                        type="text"
                        id="title"
                        value={newTitle}
                        onChange={(e) => setNewtitle(e.target.value)}
                    />
                </div>

                <div>
                    <Label>Chọn loại thông báo</Label>
                    <Select
                        onValueChange={(value) => setNewNotificationType(value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Chọn loại thông báo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="SALARY_INCREASE">SALARY_INCREASE</SelectItem>
                                <SelectItem value="LEAVE">LEAVE</SelectItem>
                                <SelectItem value="SALARY_ADJUSTMENT">SALARY_ADJUSTMENT</SelectItem>
                                <SelectItem value="REQUEST_REJECTED">REQUEST_REJECTED</SelectItem>
                                <SelectItem value="SYSTEM">SYSTEM</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label>Nội dung</Label>
                    <Textarea
                        id="content"
                        rows={5}
                        className="min-h-[120px]"
                        value={newContent}
                        onChange={(e) => setNewcontent(e.target.value)}
                    />
                </div>
                <div className="flex justify-center mt-4">
                    <Button type="submit" onClick={handleAdd} >Gửi thông báo</Button>
                </div>
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
                {mynotification.length > 0 ? (
                    mynotification.map((notification) => (
                        <NotificationHistory
                            key={notification.employeeId}
                            Header={notification.title}
                            Date={formatDateTime(notification.createdAt)}
                            Sender={myinformation?.name || "Unknown"}
                            Content={notification.notificationContent}
                            Email={myinformation?.email}
                            Department={myinformation?.department?.name || "Unknown"}
                        />
                    ))
                ) : (
                    <div className="p-4 text-gray-500">No notifications found.</div>
                )}

            </div>
        </div>

    )
}

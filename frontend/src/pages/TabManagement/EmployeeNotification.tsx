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


export default function EmployeeNotification() {
    
    return (

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
            <NotificationHistory Header="Sa thải hết" Date="1/1/2025"/>
            <NotificationHistory Header="Sa thải hết" Date="1/1/2025"/>

            </div>
        </div>

    )
}

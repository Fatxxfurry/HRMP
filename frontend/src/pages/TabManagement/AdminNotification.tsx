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
const formSchema = z.object({
    notificationame: z.string(),
    toemployee: z.string(),
    todepartment: z.string(),
    content: z.string(),
})

export default function AdminNotification() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            notificationame: "",
            toemployee: "",
            todepartment: "",
            content: "",
        },
    })
    return (

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4" >
                <Form {...form}>
                    <form  className="space-y-6">
                        {/* Tên project */}
                        <FormField
                            control={form.control}
                            name="notificationame"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tiêu đề</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập tiêu đề thông báo" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="toemployee"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mã nhân viên nhận</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập mã nhân viên nhận" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="todepartment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mã nhân viên nhận</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập phòng ban nhận" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nội dung</FormLabel>
                                    <Textarea placeholder="Nhập nội dung thông báo" {...field} />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
            <NotificationHistory Header="Sa thải hết" Date="1/1/2025"/>
            <NotificationHistory Header="Sa thải hết" Date="1/1/2025"/>

            </div>
        </div>

    )
}

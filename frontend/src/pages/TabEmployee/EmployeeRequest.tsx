//Employee Request: Form request cho nhân viên

import React from 'react'
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const formSchema = z.object({
    notificationame: z.string(),
    employeeid: z.string(),
    type: z.any(),
    todepartment: z.string(),
    content: z.string(),
    attachment: z.any()
})
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
export default function EmployeeRequest() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            notificationame: "",
            employeeid: "",
            todepartment: "",
            content: "",
        },
    })
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
                <span className="font-bold block text-center mb-4">Tạo yêu cầu, đề xuất mới</span>
                <div className="space-y-6 p-4" >
                    <Form {...form} >
                        {/*  Tên project */}
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
                            name="employeeid"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mã nhân viên gửi</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập mã nhân viên gửi" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="todepartment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phòng ban nhận</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập phòng ban nhận" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Loại yêu cầu</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn loại yêu cầu" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="dexuat">Đề xuất</SelectItem>
                                            <SelectItem value="yeucau">Yêu cầu, xin phép</SelectItem>
                                            <SelectItem value="khac">Khác</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nội dung</FormLabel>
                                    <Textarea placeholder="Nhập nội dung yêu cầu" {...field} />
                                </FormItem>
                            )}

                        />
                        <FormField
                            control={form.control}
                            name="attachment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>File đính kèm</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            onChange={(e) => field.onChange(e.target.files?.[0])}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-center">
                            <Button type="submit">Gửi</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>)
}

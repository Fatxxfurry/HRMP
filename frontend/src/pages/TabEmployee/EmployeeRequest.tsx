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
import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'
import axios from "axios"
export default function EmployeeRequest() {
    const [newtitle, setnewtitle] = useState("");
    const [newReceiver, setNewReceiver] = useState("");
    const [newContent, setnewContent] = useState("");
    const { user } = useAuth();
    
    const setNewRequest = async () => {
        try {
            const today = new Date();
            const payload = {
                name: newtitle,
                description: newContent,
                requestDate: today.toISOString().slice(0, 10),
                employee: {
                    id: user?.id
                },
                department: {
                    id: newReceiver
                },
                status: "PENDING"
            }
            console.log("payload:", payload)
            const response = await axios.post("http://localhost:8080/api/requests", payload);
            if (response.status === 201 || response.status === 200) {
                alert('Thông báo đã được tạo thành công!');
                setnewtitle('');
                setNewReceiver('');
                setnewContent('');
            } else {
                throw new Error('Lỗi khi gửi thông báo');
            }
        } catch (error) {
            console.error('Lỗi khi thêm thông báo:', error);
            alert('Gửi thông báo thất bại.');
        }
    }
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
                <span className="font-bold block text-center mb-4">Tạo yêu cầu, đề xuất mới</span>
                <div className="space-y-6 p-4" >
                    <div>
                        <Label >Tiêu đề</Label>
                        <Input
                            type="text"
                            id="title"
                            value={newtitle}
                            onChange={(e) => setnewtitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <div>
                            <Label>Chọn phòng ban nhận</Label>
                            <Select
                                onValueChange={(value) => setNewReceiver(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn phòng ban nhận" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="1">IT</SelectItem>
                                        <SelectItem value="2">SALE</SelectItem>
                                        <SelectItem value="3">HUMAN RESOURCES</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div>
                        <Label>Nội dung</Label>
                        <Textarea
                            id="content"
                            rows={5}
                            className="min-h-[120px]"
                            value={newContent}
                            onChange={(e) => setnewContent(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button type="submit" onClick={setNewRequest}>Gửi yêu cầu</Button>
                    </div>
                </div>
            </div>
        </div>)
}

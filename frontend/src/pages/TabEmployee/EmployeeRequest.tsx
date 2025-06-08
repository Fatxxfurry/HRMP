//Employee Request: Form request cho nhân viên

import React, { use } from 'react'
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
import { toast } from "sonner"
import RequestHistory from '@/components/defined/RequestHistory'
interface request {
    id: number
    name: string,
    requestDate: string,
    description: string,
    employee: {
        id: number,
        name: string,
    }
    department: {
        name: string,
        managerId: number
    },
    status: string
}
export default function EmployeeRequest() {
    const [newtitle, setnewtitle] = useState("");
    const [newReceiver, setNewReceiver] = useState("");
    const [newContent, setnewContent] = useState("");
    const { user } = useAuth();
    const [myrequest, setmyrequest] = useState<request[]>([]);
    useEffect(() => {
        if (user?.id) {
            loadMyRequest();
        }
    }, [user?.id])
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
                toast('Yêu cầu đã được tạo thành công!');
                setnewtitle('');
                setNewReceiver('');
                setnewContent('');
                loadMyRequest();
            } else {
                throw new Error('Lỗi khi gửi yêu cầu');
            }
        } catch (error) {
            console.error('Lỗi khi thêm yêu cầu:', error);
            toast('Gửi yêu cầu thất bại.');
        }
    }
    const loadMyRequest = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/requests`);
            const allRequests: request[] = response.data
            const filtereddata = allRequests.filter(request => request.employee?.id === user?.id)

            if (!response) {
                throw new Error('Failed to fetch employee request info');
            }
            console.log("my request: ", allRequests);
            setmyrequest(filtereddata);
        } catch (error) {
            console.error("Lỗi khi tải yêu cầu:", error);
        }
    }
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-[#F0F0EF] md:min-h-min" >
                <span className="font-bold block text-center m-4 text-xl">Tạo yêu cầu, đề xuất mới</span>
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
            <div className="min-h-[100vh] flex-1 rounded-xl bg-[#F0F0EF] md:min-h-min" >
                {myrequest.length > 0 ? (
                    myrequest.map((request) => (
                        <RequestHistory
                            key={request.id}
                            requestID={request.id}
                            Header={request.name}
                            Date={request.requestDate}
                            Sender={request?.employee.name || "Unknown"}
                            Content={request.description}
                            Status={request.status}
                            Department={request?.department?.name || "Unknown"}
                        />
                    ))
                ) : (
                    <div className="p-4 text-gray-500">No notifications found.</div>
                )}

            </div>
        </div>)
}

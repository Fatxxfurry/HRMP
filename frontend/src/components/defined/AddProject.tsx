import React from 'react'
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useParams } from 'react-router'
import axios from 'axios'
import { toast } from "sonner"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Project {
    name: string,
    start_date: string,
    end_date: string,
    involededDepartments: {
        id: number,
    },
    employee: {
        id: number,
    }

}
export default function AddProject() {
    const [Project, setProject] = useState<Project>({
        name: "",
        start_date: "",
        end_date: "",
        involededDepartments: {
            id: 0,
        },
        employee: {
            id: 0,
        }
    })

    const { user } = useAuth()


    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:8080/api/projects", Project);
            toast("Dự án đã được tạo.");
        } catch (error) {
            console.error(error);
            toast("Lỗi khi tạo Dự án .");
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-[#F0F0EF] md:min-h-min p-4" >
                <span className="font-bold block text-center mb-4">Tạo dự án mới</span>
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    
                    <div>
                        <Label >Tên dự án</Label>
                        <Input
                            type="text"
                            id="project_name"
                            value={Project.name}
                            onChange={(e) => setProject({ ...Project, name: e.target.value })} />
                    </div>

                    <div>
                        <Label >Ngày bắt đầu</Label>
                        <Input
                            type="date"
                            id="start_date"
                            value={Project.start_date}
                            onChange={(e) => setProject({ ...Project, start_date: e.target.value })} />
                    </div>
                    <div>
                        <Label >Ngày kết thúc</Label>
                        <Input
                            type="date"
                            id="end_date"
                            value={Project.end_date}
                            onChange={(e) => setProject({ ...Project, end_date: e.target.value })} />
                    </div>
                    <div>
                        <Label >Nhân viên quản lí</Label>
                        <Input
                            type="text"
                            id="employee_id"
                            value={Project.employee.id}
                            onChange={(e) => setProject({ ...Project, employee: { id: Number(e.target.value) || 0 } })} />
                    </div>
                    <div>
                        <Label >Phòng ban quản lí</Label>
                        <Input
                            type="text"
                            id="department_id"
                            value={Project.involededDepartments.id}
                            onChange={(e) => setProject({ ...Project, involededDepartments: { id: Number(e.target.value) || 0 } })} />
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <Button type="submit" onClick={handleSubmit}>Thêm dự án</Button>
                </div>
            </div>
        </div>

    )
}

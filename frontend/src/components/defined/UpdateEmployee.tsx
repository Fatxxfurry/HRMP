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
    interface UpdateEmployeeProps {
        name: string,
        address: string,
        phone: string,
        email: string,
        position: string,
        role: string,
        gender: string,
        identification: string,
        birth_date: string,
        hire_date: string,
        username: string
        password: string,
    }

export default function UpdateEmployee() {
    const [Employee, setEmployee] = useState<UpdateEmployeeProps>({
        name: "",
        address: "",
        phone: "",
        email: "",
        position: "",
        role: "",
        gender: "",
        identification: "",
        birth_date: "",
        hire_date: "",
        username: "",
        password: "",
    })
    const { id } = useParams<{ id: string }>();

    const {user} = useAuth()
    useEffect(() => {
        LoadEmployee();
    }, [user]);
    const LoadEmployee = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/employees/${id}`);
            setEmployee(response.data);
            console.log("Nhân viên hiện tại:", response.data);
        } catch (error) {
            console.error("Lỗi khi tạo nhân viên:", error);
        }
    };
    const UpdateEmployee = async () => {
       
        try {
            const response = await axios.put(`http://localhost:8080/api/employees/${id}`, Employee);
            console.log("Nhân viên đã được cập nhật:", response.data);
            toast("Nhân viên đã được cập nhật thành công!");
        } catch (error) {
            console.error("Lỗi khi cập nhật nhân viên:", error);
            toast("Thất bại khi cập nhật nhân viên!");

        }
    }
  
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4" >
                <span className="font-bold block text-center mb-4">Sửa thông tin nhân viên</span>
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <div>
                        <Label >Tên nhân viên</Label>
                        <Input
                            type="text"
                            id="name"
                            value={Employee.name}
                            onChange={(e) => setEmployee({ ...Employee, name: e.target.value })} />
                    </div>
                    <div>
                        <Label >Địa chỉ nhân viên</Label>
                        <Input
                            type="text"
                            id="address"
                            value={Employee.address}
                            onChange={(e) => setEmployee({ ...Employee, address: e.target.value })} />
                    </div>
                    <div>
                        <Label >Số điện thoại</Label>
                        <Input
                            type="text"
                            id="phone"

                            value={Employee.phone}
                            onChange={(e) => setEmployee({ ...Employee, phone: e.target.value })} />
                    </div>
                    <div>
                        <Label >Email</Label>
                        <Input
                            type="email"
                            id="email"

                            value={Employee.email}
                            onChange={(e) => setEmployee({ ...Employee, email: e.target.value })} />
                    </div>
                    <div>
                        <Label >Vị trí</Label>
                        <Input
                            type="text"
                            id="position"
                            value={Employee.position}
                            onChange={(e) => setEmployee({ ...Employee, position: e.target.value })} />
                    </div>
                    <div>
                        <Label >Giới tính</Label>
                        <Input type="text" id="gender"
                            defaultValue={Employee.gender}
                            value={Employee.gender}
                            onChange={(e) => setEmployee({ ...Employee, gender: e.target.value })} />
                    </div>
                    <div>
                        <Label >Căn cước</Label>
                        <Input type="text" id="identification"
                            value={Employee.identification}
                            onChange={(e) => setEmployee({ ...Employee, identification: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label >Ngày sinh</Label>
                        <Input type="text" id="birth_date"
                            value={Employee.birth_date}
                            onChange={(e) => setEmployee({ ...Employee, birth_date: e.target.value })} />
                    </div>
                    <div>
                        <Label >Ngày bắt đầu làm việc</Label>
                        <Input type="text" id="hire_date"
                            value={Employee.hire_date}
                            onChange={(e) => setEmployee({ ...Employee, hire_date: e.target.value })}
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <Button type="submit" onClick={UpdateEmployee}>Cập nhật</Button>
                </div>
            </div>
        </div>

    )
}

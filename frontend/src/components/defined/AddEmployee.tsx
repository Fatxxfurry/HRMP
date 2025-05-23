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
import axios from 'axios'
interface AddEmployeeProps {
    name: string,
    address: string,
    phone: string,
    email: string,
    department_id: string,
    position: string,
    role: string,
    gender: string,
    identification: string,
    birth_date: string,
    hire_date: string,
    username: string
    password: string,
}

export default function AddEmployee() {
    const [newEmployee, setNewEmployee] = useState<AddEmployeeProps>({
        name: "",
        address: "",
        phone: "",
        email: "",
        department_id: "",
        position: "",
        role: "",
        gender: "",
        identification: "",
        birth_date: "",
        hire_date: "",
        username: "",
        password: "",
    })
    const CreateEmployee = async () => {
        const payload = {
            ...newEmployee,
            department: {
                id: parseInt(newEmployee.department_id),
            },
        };

        // Xoá `department_id` khỏi payload nếu không cần gửi
        delete (payload as any).department_id;

        try {
            const response = await axios.post("http://localhost:8080/api/employees", payload);
            console.log("Nhân viên đã được tạo:", response.data);
        } catch (error) {
            console.error("Lỗi khi tạo nhân viên:", error);
        }
    };
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4" >
                <span className="font-bold block text-center mb-4">Thêm nhân viên</span>
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <div>
                        <Label >Tên nhân viên</Label>
                        <Input
                            type="text"
                            id="name"
                            value={newEmployee.name}
                            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} />
                    </div>
                    <div>
                        <Label >Địa chỉ nhân viên</Label>
                        <Input
                            type="text"
                            id="address"
                            value={newEmployee.address}
                            onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })} />
                    </div>
                    <div>
                        <Label >Số điện thoại</Label>
                        <Input
                            type="text"
                            id="phone"
                            value={newEmployee.phone}
                            onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })} />
                    </div>
                    <div>
                        <Label >Email</Label>
                        <Input
                            type="email"
                            id="email"
                            value={newEmployee.email}
                            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} />
                    </div>

                    <div>
                        <Label >ID Phòng ban</Label>
                        <Input
                            type="text"
                            id="department_id"
                            value={newEmployee.department_id}
                            onChange={(e) => setNewEmployee({ ...newEmployee, department_id: e.target.value })} />
                    </div>

                    <div>
                        <Label >Vị trí</Label>
                        <Input
                            type="text"
                            id="position"
                            value={newEmployee.position}
                            onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })} />
                    </div>
                    <div>
                        <Label >Quyền</Label>
                        <Input
                            type="text"
                            id="role"
                            value={newEmployee.role}
                            onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="picture">Ảnh đại diện</Label>
                        <Input id="picture" type="file" placeholder="asd" />
                    </div>
                    <div>
                        <Label >Giới tính</Label>
                        <Input type="text" id="gender"
                            value={newEmployee.gender}
                            onChange={(e) => setNewEmployee({ ...newEmployee, gender: e.target.value })} />
                    </div>
                    <div>
                        <Label >Căn cước</Label>
                        <Input type="text" id="identification"
                            value={newEmployee.identification}
                            onChange={(e) => setNewEmployee({ ...newEmployee, identification: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label >Ngày sinh</Label>
                        <Input type="text" id="birth_date"
                            value={newEmployee.birth_date}
                            onChange={(e) => setNewEmployee({ ...newEmployee, birth_date: e.target.value })} />
                    </div>
                    <div>
                        <Label >Ngày bắt đầu làm việc</Label>
                        <Input type="text" id="hire_date"
                            value={newEmployee.hire_date}
                            onChange={(e) => setNewEmployee({ ...newEmployee, hire_date: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label >Tài khoản nhân viên</Label>
                        <Input type="text" id="username"
                            value={newEmployee.username}
                            onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label >Mật khẩu nhân viên</Label>
                        <Input type="text" id="password"
                            value={newEmployee.password}
                            onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })} />
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <Button type="submit" onClick={CreateEmployee}>Thêm</Button>
                </div>
            </div>
        </div>

    )
}

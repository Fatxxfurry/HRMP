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
import { toast } from "sonner"
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
    avatar: string,
    bank: string,
    bank_number: string,
    insurance: string,
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
        avatar: "",
        bank: "",
        bank_number: "",
        insurance: "",
    })
    const CreateEmployee = async () => {
        const payload = {
            ...newEmployee,
            department: {
                id: Number(newEmployee.department_id),
            },
        };

        // Xoá `department_id` khỏi payload nếu không cần gửi
        //delete (payload as any).department_id;

        try {
            const response = await axios.post("http://localhost:8080/api/employees", payload);
            console.log("Nhân viên đã được tạo:", response.data);
            toast("Nhân viên đã được tạo thành công!");

        } catch (error) {
            console.error("Lỗi khi tạo nhân viên:", error);
            toast("Nhân viên đã được tạo thất bại!");
        }
    };
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-[#F0F0EF] md:min-h-min p-4" >
                <span className="font-bold block text-center mb-4">Thêm nhân viên</span>
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <div>
                        <Label >Tên nhân viên</Label>
                        <Input
                            type="text"
                            id="name"
                            value={newEmployee.name}
                            placeholder='Nguyễn Văn A'
                            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} />

                    </div>
                    <div>
                        <Label >Địa chỉ nhân viên</Label>
                        <Input
                            type="text"
                            id="address"
                            placeholder='Thủ đức, TPHCM'

                            value={newEmployee.address}
                            onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })} />
                    </div>
                    <div>
                        <Label >Số điện thoại</Label>
                        <Input
                            type="text"
                            id="phone"
                            placeholder='0900123456'
                            value={newEmployee.phone}
                            onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })} />
                    </div>
                    <div>
                        <Label >Email</Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder='VanA@gmail.com'

                            value={newEmployee.email}
                            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} />
                    </div>

                    <div>
                        <Label >ID Phòng ban</Label>
                        <Input
                            type="text"
                            id="department_id"
                            placeholder='1'
                            value={newEmployee.department_id}
                            onChange={(e) => setNewEmployee({ ...newEmployee, department_id: e.target.value })} />
                    </div>

                    <div>
                        <Label >Vị trí</Label>
                        <Input
                            type="text"
                            id="position"
                            placeholder='Developer'
                            value={newEmployee.position}
                            onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })} />
                    </div>
                    <div>
                        <Label >Quyền</Label>
                        <Input
                            type="text"
                            id="role"
                            placeholder='ROLE_USER, ROLE_MANAGER'
                            value={newEmployee.role}
                            onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label>Ảnh đại diện</Label>
                        <Input id="picture" type="text" placeholder="https://..." value={newEmployee.avatar}
                            onChange={(e) => setNewEmployee({ ...newEmployee, avatar: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label >Giới tính</Label>
                        <Input type="text" id="gender"
                            value={newEmployee.gender}
                            placeholder='MALE, FEMALE'

                            onChange={(e) => setNewEmployee({ ...newEmployee, gender: e.target.value })} />
                    </div>
                    <div>
                        <Label >Căn cước</Label>
                        <Input type="text" id="identification"
                            placeholder='052204012345'

                            value={newEmployee.identification}
                            onChange={(e) => setNewEmployee({ ...newEmployee, identification: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label >Ngày sinh</Label>
                        <Input type="date" id="birth_date"
                            value={newEmployee.birth_date}
                            onChange={(e) => setNewEmployee({ ...newEmployee, birth_date: e.target.value })} />
                    </div>
                    <div>
                        <Label >Ngày bắt đầu làm việc</Label>
                        <Input type="date" id="hire_date"

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
                    <div>
                        <Label >Ngân hàng</Label>
                        <Input type="text" id="bank"
                            value={newEmployee.bank}
                            onChange={(e) => setNewEmployee({ ...newEmployee, bank: e.target.value })} />
                    </div>
                    <div>
                        <Label >Số tài khoản</Label>
                        <Input type="text" id="bank_number"
                        
                            value={newEmployee.bank_number}
                            onChange={(e) => setNewEmployee({ ...newEmployee, bank_number: e.target.value })} />
                    </div>
                    <div>
                        <Label >Số bảo hiểm</Label>
                        <Input type="text" id="insurance"
                            placeholder='10 số'
                            value={newEmployee.insurance}
                            onChange={(e) => setNewEmployee({ ...newEmployee, insurance: e.target.value })} />
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <Button type="submit" onClick={CreateEmployee}>Thêm</Button>
                </div>
            </div>
        </div>

    )
}

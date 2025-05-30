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
interface Salary {
    basic_salary: string,
    bonus: string,
    minus: string,
    bonus_reason: string,
    minus_reason: string,
    date_paid: string,
    total_salary: string
}
export default function UpdateEmployeeSalary() {
    const [EmployeeSalary, setEmployeeSalary] = useState<Salary>({
        basic_salary: "",
        minus: "",
        bonus: "",
        date_paid: "",
        bonus_reason: "",
        minus_reason: "",
        total_salary: "",
    })
    const { id } = useParams<{ id: string }>();

    const { user } = useAuth()
    useEffect(() => {
        LoadEmployee();
    }, [user]);
    const LoadEmployee = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/salaries/${id}`);
            setEmployeeSalary(response.data);
            console.log("Nhân viên hiện tại:", response.data);
        } catch (error) {
            console.error("Lỗi khi tạo nhân viên:", error);
        }
    };
    const UpdateEmployee = async () => {
        
        try {
            const response = await axios.put(`http://localhost:8080/api/salaries/${id}`, EmployeeSalary);
            toast("lương Nhân viên đã được cập nhật:");
        } catch (error) {
            toast("Lỗi khi cập nhật lương nhân viên:");
        }
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4" >
                <span className="font-bold block text-center mb-4">Sửa lương nhân viên</span>
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <div>
                        <Label >Lương cơ bản</Label>
                        <Input
                            type="text"
                            id="name"
                            value={EmployeeSalary.basic_salary}
                            onChange={(e) => setEmployeeSalary({ ...EmployeeSalary, basic_salary: e.target.value })} />
                    </div>

                    <div>
                        <Label >Thưởng</Label>
                        <Input
                            type="text"
                            id="address"
                            value={EmployeeSalary.bonus}
                            onChange={(e) => setEmployeeSalary({ ...EmployeeSalary, bonus: e.target.value })} />
                    </div>
                    <div>
                        <Label >Lí do thưởng</Label>
                        <Input
                            type="text"
                            id="phone"

                            value={EmployeeSalary.bonus_reason}
                            onChange={(e) => setEmployeeSalary({ ...EmployeeSalary, bonus_reason: e.target.value })} />
                    </div>
                    <div>
                        <Label >Phạt</Label>
                        <Input
                            type="email"
                            id="email"

                            value={EmployeeSalary.minus}
                            onChange={(e) => setEmployeeSalary({ ...EmployeeSalary, minus: e.target.value })} />
                    </div>
                    <div>
                        <Label >Lí do phạt</Label>
                        <Input
                            type="text"
                            id="position"
                            value={EmployeeSalary.minus_reason}
                            onChange={(e) => setEmployeeSalary({ ...EmployeeSalary, minus_reason: e.target.value })} />
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <Button type="submit" onClick={UpdateEmployee}>Cập nhật</Button>
                </div>
            </div>
        </div>

    )
}

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
    employee: {
        id: number
    }
}
export default function AddSalary() {
    const [EmployeeSalary, setEmployeeSalary] = useState<Salary>({
        basic_salary: "",
        minus: "",
        bonus: "",
        date_paid: "",
        bonus_reason: "",
        minus_reason: "",
        total_salary: "",
        employee: {
            id: 0
        }
    })

    const { user } = useAuth()
 

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:8080/api/salaries", EmployeeSalary);
            toast("Kế hoạch nhận lương đã được tạo.");
        } catch (error) {
            console.error(error);
            toast("Lỗi khi tạo lịch nhận lương.");
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-[#F0F0EF] md:min-h-min p-4" >
                <span className="font-bold block text-center mb-4">Tạo lịch nhận lương cho nhân viên</span>
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <div>
                        <Label>Mã nhân viên</Label>
                        <Input
                            type="number"
                            value={EmployeeSalary.employee.id}
                            onChange={(e) =>
                                setEmployeeSalary({
                                    ...EmployeeSalary,
                                    employee: {
                                        ...EmployeeSalary.employee,
                                        id: parseInt(e.target.value) || 0,
                                    },
                                })
                            }
                        />
                    </div>
                    <div>
                        <Label >Lương cơ bản</Label>
                        <Input
                            type="text"
                            id="basic_salary"
                            value={EmployeeSalary.basic_salary}
                            onChange={(e) => setEmployeeSalary({ ...EmployeeSalary, basic_salary: e.target.value })} />
                    </div>

                    <div>
                        <Label >Thưởng</Label>
                        <Input
                            type="text"
                            id="bonus"
                            value={EmployeeSalary.bonus}
                            onChange={(e) => setEmployeeSalary({ ...EmployeeSalary, bonus: e.target.value })} />
                    </div>
                    <div>
                        <Label >Lí do thưởng</Label>
                        <Input
                            type="text"
                            id="bonus_reason"

                            value={EmployeeSalary.bonus_reason}
                            onChange={(e) => setEmployeeSalary({ ...EmployeeSalary, bonus_reason: e.target.value })} />
                    </div>
                    <div>
                        <Label >Phạt</Label>
                        <Input
                            type="text"
                            id="minus"

                            value={EmployeeSalary.minus}
                            onChange={(e) => setEmployeeSalary({ ...EmployeeSalary, minus: e.target.value })} />
                    </div>
                    <div>
                        <Label >Lí do phạt</Label>
                        <Input
                            type="text"
                            id="minus_reason"
                            value={EmployeeSalary.minus_reason}
                            onChange={(e) => setEmployeeSalary({ ...EmployeeSalary, minus_reason: e.target.value })} />
                    </div>
                     <div>
                        <Label >Ngày nhận dự kiến</Label>
                        <Input
                            type="date"
                            id="date_paid"
                            value={EmployeeSalary.date_paid}
                            onChange={(e) => setEmployeeSalary({ ...EmployeeSalary, date_paid: e.target.value })} />
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <Button type="submit" onClick={handleSubmit}>Cập nhật</Button>
                </div>
            </div>
        </div>

    )
}

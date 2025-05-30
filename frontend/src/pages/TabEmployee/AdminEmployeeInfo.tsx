//Employye Info: Trang thông tin nhân viên


import React from 'react'
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Card
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, User, Phone, Mail, MapPin, IdCard, ShieldCheck, Building2, BadgeCheck, BriefcaseBusiness, Wallet, Banknote, CalendarClock, Landmark, CreditCard } from "lucide-react"
import { useState } from "react"
import { useEffect } from 'react'
import { useAuth } from "@/context/AuthContext"
import { useParams } from "react-router"
import axios from "axios"
interface Department {
    id: number;
    name: string;
    managerId: number;
}

interface Employee {
    id: number
    name: string
    email: string
    phone: string
    address: string
    role: string
    salary: number
    age: number,
    gender: string,
    identification: string,
    birth_date: any,
    hire_date: any,
    department: Department
    avatar: string
}
export default function AdminEmployeeInfo() {
    const { id } = useParams<{ id: string }>();
    const [employee, setEmployee] = useState<Employee | null>(null);
    useEffect(() => {

        if (id) {
            loadEmployeeInfo(id);
        }

    }, [id])
    const loadEmployeeInfo = async (id: string) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/employees/${id}`)
            console.log(response.data)
            if (!response) {
                throw new Error('Failed to fetch employee info')
            }
            const data = response.data
            setEmployee(data)
        } catch (error) {
            console.error('Error fetching employee info:', error)
        }
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
                {employee && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold text-center">Thông tin nhân viên</CardTitle>

                            <div className='flex flex-row items-center justify-center '>
                                <div className="flex flex-row items-center justify-center">
                                    <Avatar className="w-32 h-32">
                                        <AvatarImage src={employee.avatar} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>

                                    <span className='text-xl font-bold p-8'>{employee?.name}</span>

                                    <div className="flex flex-col gap-2 text-sm justify-center">
                                        <div>
                                            <span className="text-xl font-light">Work Email: {employee.email}</span>
                                        </div>
                                        <div>
                                            <span className="text-xl font-light">Work Phone: {employee.phone}</span>
                                        </div>
                                        <div>
                                            <span className="text-xl font-light">Phone: {employee.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <Separator />
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-6 mt-4">
                                {/* Thông tin cá nhân */}
                                <div className="space-y-3">
                                    <h2 className="text-xl font-bold">Thông tin cá nhân</h2>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={18} />
                                        <span className="text-xl font-light">Ngày sinh: {employee.birth_date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User size={18} />
                                        <span className="text-xl font-light">Giới tính: {employee.gender} </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={18} />
                                        <span className="text-xl font-light">Quốc gia: Việt Nam</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={18} />
                                        <span className="text-xl font-light">Địa chỉ: {employee.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail size={18} />
                                        <span className="text-xl font-light">Email: {employee.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone size={18} />
                                        <span className="text-xl font-light">Số điện thoại: {employee.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <IdCard size={18} />
                                        <span className="text-xl font-light">Căn cước: {employee.identification}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={18} />
                                        <span className="text-xl font-light">Số BHXH: 123456789</span>
                                    </div>
                                </div>

                                {/* Thông tin công việc */}
                                <div className="space-y-3">
                                    <h2 className="text-xl font-bold">Thông tin công việc</h2>
                                    <div className="flex items-center gap-2">
                                        <Building2 size={18} />
                                        <span className="text-xl font-light">Phòng ban: {employee.department?.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BadgeCheck size={18} />
                                        <span className="text-xl font-light">Loại nhân viên: Full-time</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User size={18} />
                                        <span className="text-xl font-light">Quản lí: {employee.department.managerId}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BriefcaseBusiness size={18} />
                                        <span className="text-xl font-light">Vị trí: Backend Developer</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Wallet size={18} />
                                        <span className="text-xl font-light">Lương cơ bản: {employee.salary}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CalendarClock size={18} />
                                        <span className="text-xl font-light">Ngày bắt đầu: {employee.hire_date}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Landmark size={18} />
                                        <span className="text-xl font-light">Tên ngân hàng: BIDV</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CreditCard size={18} />
                                        <span className="text-xl font-light">Số tài khoản: 123456789</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>

    )
}

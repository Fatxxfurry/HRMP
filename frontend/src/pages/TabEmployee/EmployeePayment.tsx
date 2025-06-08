//Employee Payment: Chứa thông tin lương của nhân viên


import React from 'react'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'
import axios from "axios"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ScrollArea } from '@/components/ui/scroll-area'

interface Salary {
    id: number,
    basic_salary: string,
    bonus: string,
    minus: string,
    bonus_reason: string,
    minus_reason: string,
    date_paid: string,
    employee: {
        id: number,
        name: string,
    },
    total_salary: string
}
export default function EmployeePayment() {
    const [salaryData, setSalaryData] = useState<Salary[]>([]);
    const { user } = useAuth();
    useEffect(() => {
        if (user?.id) {
            loadSalaryData()
        }
    }, [user])
    const loadSalaryData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/salaries`)
            if (!response) {
                throw new Error('Failed to fetch employee my notification info')
            }
            const data: Salary[] = response.data
            const filtereddata = data.filter(Salary => Salary.employee?.id === user?.id)

            console.log("my loadSalaryData: ", data)
            setSalaryData(filtereddata)
        } catch (error) {
            console.error('Error fetching salary info:', error)
        }
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">

            <div className="min-h-[100vh] flex-1 rounded-xl bg-[#F0F0EF] md:min-h-min" >
                <ScrollArea className="h-[250px] rounded-md border p-4">
                    <Table >
                        <TableCaption>Danh sách kế hoạch nhận lương của nhân viên.</TableCaption>
                        <TableHeader className="bg-[#2D2D38] border-b-2 text-white">
                            <TableRow className="divide-x divide-slate-200">
                                <TableHead className="font-semibold text-white px-4 py-3">STT</TableHead>
                                <TableHead className="font-semibold text-white px-4 py-3">Tháng thứ</TableHead>
                                <TableHead className="font-semibold text-white px-4 py-3">Ngày dự kiến nhận</TableHead>
                                <TableHead className="font-semibold text-white px-4 py-3">Lương cứng</TableHead>
                                <TableHead className="font-semibold text-white px-4 py-3">Thưởng</TableHead>
                                <TableHead className="font-semibold text-white px-4 py-3">Phạt</TableHead>
                                <TableHead className="font-semibold text-white px-4 py-3">Tổng cộng</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {salaryData.length > 0 ? (
                                salaryData.map((salary, index) => (
                                    <TableRow key={salary.id}>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{salary.date_paid}</TableCell>
                                        <TableCell>{salary.basic_salary}</TableCell>
                                        <TableCell>{salary.bonus}</TableCell>
                                        <TableCell>{salary.minus}</TableCell>
                                        <TableCell>{salary.total_salary}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        Không tìm thấy kết quả.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </div>
        </div>
    )
}

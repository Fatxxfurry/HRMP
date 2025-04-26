//Employee Payment: Chứa thông tin lương của nhân viên


import React from 'react'
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
const Projectdata = [
    { id: "1", monthno: "1", date: "1/1/2024", basic: "10000000", reward: "500000", penalty: "200000", total: "13000000" },
    { id: "2", monthno: "2", date: "1/2/2024", basic: "10000000", reward: "500000", penalty: "200000", total: "13000000" },
    { id: "3", monthno: "3", date: "1/3/2024", basic: "10000000", reward: "500000", penalty: "200000", total: "13000000" },
    { id: "4", monthno: "4", date: "1/4/2024", basic: "10000000", reward: "500000", penalty: "200000", total: "13000000" },
]
export default function EmployeePayment() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
          <ScrollArea className="h-[250px] rounded-md border p-4">
                        <Table >
                            <TableCaption>Danh sách tình trạng chấm công của nhân viên.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead >STT</TableHead>
                                    <TableHead>Tháng thứ</TableHead>
                                    <TableHead>Ngày nhận</TableHead>
                                    <TableHead >Lương cứng</TableHead>
                                    <TableHead >Thưởng</TableHead>
                                    <TableHead >Phạt</TableHead>
                                    <TableHead >Tổng cộng</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Projectdata.length > 0 ? (
                                    Projectdata.map((salary) => (
                                        <TableRow key={salary.id}>
                                            <TableCell className="font-medium">{salary.id}</TableCell>
                                            <TableCell>{salary.monthno}</TableCell>
                                            <TableCell>{salary.date}</TableCell>
                                            <TableCell>{salary.basic}</TableCell>
                                            <TableCell>{salary.reward}</TableCell>
                                            <TableCell>{salary.penalty}</TableCell>
                                            <TableCell>{salary.total}</TableCell>

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

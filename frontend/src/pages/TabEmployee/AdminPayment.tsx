//Trang Admin Payment chứa thông tin về tình trạng lương, thưởng của các nhân viên 

import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

import { ScrollArea } from "@/components/ui/scroll-area"

import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Pie, PieChart } from "recharts"
const PenaltyBonusChartConfig = {
    finished: {
        label: "Finished",
        color: "hsl(var(--chart-1))",
    },
    unfinished: {
        label: "Unfinished",
        color: "hsl(var(--chart-2))",
    }
}
const PenaltyBonusData = [
    { status: "Penalty", number: 5000000, fill: "hsl(var(--chart-1))" },
    { status: "Bonus", number: 1000000, fill: "hsl(var(--chart-2))" },
]
const employeeWageData = [
    { id: "NV001", name: "Nguyễn Văn A", department: "IT", position: "Dev", basicwage: "5000000", bonus: "1000000", penalty: "500000", total: "5500000" },
    { id: "NV002", name: "Nguyễn Văn B", department: "HR", position: "HR", basicwage: "5000000", bonus: "1000000", penalty: "500000", total: "5500000" },
    { id: "CEO003", name: "Nguyễn Văn C", department: "BUS", position: "CEO", basicwage: "5000000", bonus: "1000000", penalty: "500000", total: "5500000" },
]
export default function AdminPayment() {
    const [nameFilter, setNameFilter] = useState("")
    const [departmentFilter, setDepartmentFilter] = useState("")
    const [positionFilter, setPositionFilter] = useState("")

    // Get unique departments and positions for filter dropdowns
    const departments = [...new Set(employeeWageData.map((emp) => emp.department))]
    const positions = [...new Set(employeeWageData.map((emp) => emp.position))]

    // Filter the data based on current filter values
    const filteredData = employeeWageData.filter((employee) => {
        const nameMatch = employee.name.toLowerCase().includes(nameFilter.toLowerCase())
        const departmentMatch = !departmentFilter || employee.department === departmentFilter
        const positionMatch = !positionFilter || employee.position === positionFilter

        return nameMatch && departmentMatch && positionMatch
    })

    // Clear all filters
    const clearFilters = () => {
        setNameFilter("")
        setDepartmentFilter("")
        setPositionFilter("")
    }
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                <div className="aspect-video rounded-xl bg-muted/50 p-6 flex justify-center items-center">
                    <div className="w-full max-w-sm">
                        <span className="font-bold block text-center mb-4">Thưởng / phạt</span>
                        <div className="grid gap-4">
                            <div>
                                <Label htmlFor="EmployeeID">Mã nhân viên</Label>
                                <Input type="text" id="EmployeeID" placeholder="Mã nhân viên" />
                            </div>
                            <div>
                                <Label>Thao tác</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Chọn thao tác" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bonus">Thưởng</SelectItem>
                                        <SelectItem value="penalty">Phạt</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="Reason">Lí do thưởng/phạt</Label>
                                <Input type="text" id="Reason" placeholder="Lí do" />
                            </div>
                            <Button >
                                Xác nhận
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="aspect-video rounded-xl bg-muted/50 p-6 flex justify-center items-center" >
                    <div className="w-full max-w-sm">
                        <span className="font-bold block text-center mb-4">Sửa lương</span>
                        <div className="grid gap-4">
                            <div>
                                <Label htmlFor="EmployeeID">Mã nhân viên</Label>
                                <Input type="text" id="EmployeeID" placeholder="Mã nhân viên" />
                            </div>
                     
                            <div>
                                <Label htmlFor="Reason">Lương mới</Label>
                                <Input type="text" id="Reason" placeholder="Lương mới" />
                            </div>
                            <Button >
                                Xác nhận
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
                <div className="flex flex-row gap-4  mb-2">
                    <div className="space-y-2">
                        <Input
                            id="name-filter"
                            placeholder="Tìm theo tên..."
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                            <SelectTrigger id="department-filter">
                                <SelectValue placeholder="Chọn phòng ban" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả</SelectItem>
                                {departments.map((dept) => (
                                    <SelectItem key={dept} value={dept}>
                                        {dept}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Select value={positionFilter} onValueChange={setPositionFilter}>
                            <SelectTrigger id="position-filter">
                                <SelectValue placeholder="Chọn vị trí" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả</SelectItem>
                                {positions.map((pos) => (
                                    <SelectItem key={pos} value={pos}>
                                        {pos}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {(nameFilter || departmentFilter || positionFilter) && (
                        <div className="space-y-2">
                            <Button variant="outline" className="" onClick={clearFilters}>
                                <X className="h-4 w-4 mr-2" />
                                Xóa bộ lọc
                            </Button>
                        </div>

                    )}
                </div>
                <ScrollArea className="h-[250px] rounded-md border p-4">
                    <Table>
                        <TableCaption>Danh sách nhân viên và lương tương ứng.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Mã nhân viên</TableHead>
                                <TableHead>Tên nhân viên</TableHead>
                                <TableHead>Phòng ban trực thuộc</TableHead>
                                <TableHead>Vị trí</TableHead>
                                <TableHead>Lương cơ bản</TableHead>
                                <TableHead>Thưởng</TableHead>
                                <TableHead>Phạt</TableHead>
                                <TableHead>Tổng cộng</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.length > 0 ? (
                                filteredData.map((salary) => (
                                    <TableRow key={salary.id}>
                                        <TableCell className="font-medium">{salary.id}</TableCell>
                                        <TableCell>{salary.name}</TableCell>
                                        <TableCell>{salary.department}</TableCell>
                                        <TableCell>{salary.position}</TableCell>
                                        <TableCell>{salary.basicwage}</TableCell>
                                        <TableCell>{salary.bonus}</TableCell>
                                        <TableCell>{salary.penalty}</TableCell>
                                        <TableCell>{salary.total}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center">
                                        Không tìm thấy dữ liệu phù hợp
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

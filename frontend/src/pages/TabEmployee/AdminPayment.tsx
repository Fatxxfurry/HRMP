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
import { Link } from 'react-router'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Pie, PieChart } from "recharts"
import { useAuth } from '@/context/AuthContext'
import axios from "axios"
import { useEffect } from 'react'
import { useNavigate } from "react-router"
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
        position: string,
        department: {
            id: number,
            name: string,
            managerId: number
        }
    },
    total_salary: string
}
export default function AdminPayment() {
    const [nameFilter, setNameFilter] = useState("")
    const [departmentFilter, setDepartmentFilter] = useState("")
    const [positionFilter, setPositionFilter] = useState("")
    const [employeeWageData, setemployeeWageData] = useState<Salary[]>([]);
    const { user } = useAuth();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [deleteSalary, setdeleteSalary] = useState<Salary | null>(null);

    const navigate = useNavigate()

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

            console.log("my loadSalaryData: ", data)
            setemployeeWageData(data)
        } catch (error) {
            console.error('Error fetching salary info:', error)
        }
    }
    const handleEdit = (id: number) => {
        navigate(`/admin/edit-salary/${id}`);

    };
    // Get unique departments and positions for filter dropdowns
    const departments = [...new Set(employeeWageData.map((emp) => emp.employee?.department?.name))]
    const positions = [...new Set(employeeWageData.map((emp) => emp.employee?.position))]

    // Filter the data based on current filter values
    const filteredData = employeeWageData.filter((emp) => {
        const nameMatch = emp.employee?.name?.toLowerCase().includes(nameFilter.toLowerCase()) ?? false;
        const departmentMatch = !departmentFilter || emp.employee?.department?.name === departmentFilter;
        const positionMatch = !positionFilter || emp.employee?.position === positionFilter;

        return nameMatch && departmentMatch && positionMatch;
    });

    // Clear all filters
    const clearFilters = () => {
        setNameFilter("")
        setDepartmentFilter("")
        setPositionFilter("")
    }
    const handleDelete = (salary: Salary) => {
        setdeleteSalary(salary);
        setShowDeleteDialog(true);
    };
    const confirmDelete = async () => {
        try {
            if (deleteSalary) {
                await axios.delete(`http://localhost:8080/api/salaries/${deleteSalary.id}`);
                // Xóa khỏi UI sau khi xóa backend thành công
                setemployeeWageData((prev) => prev.filter((e) => e.id !== deleteSalary.id));
                setShowDeleteDialog(false);
                setdeleteSalary(null);
            }
        } catch (error) {
            console.error("Lỗi khi xóa nhân viên:", error);
        }
    };
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">


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
                                <TableHead>Thao tác</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.length > 0 ? (
                                filteredData.map((salary) => (
                                    salary.employee ? (
                                        <TableRow key={salary.id}>
                                            <TableCell className="font-medium">{salary.employee.id}</TableCell>
                                            <TableCell>{salary.employee.name}</TableCell>
                                            <TableCell>{salary.employee.department?.name ?? "N/A"}</TableCell>
                                            <TableCell>{salary.employee.position ?? "N/A"}</TableCell>
                                            <TableCell>{salary.basic_salary}</TableCell>
                                            <TableCell>{salary.bonus}</TableCell>
                                            <TableCell>{salary.minus}</TableCell>
                                            <TableCell>{salary.total_salary}</TableCell>
                                            <TableCell className="space-x-2">
                                                <Button variant="outline" size="sm" onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleEdit(salary.id)
                                                }}>
                                                    Sửa
                                                </Button>
                                                <Button variant="destructive" size="sm" onClick={() =>
                                                    handleDelete(salary)
                                                }>
                                                    Xóa
                                                </Button>
                                                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Xác nhận xoá</DialogTitle>
                                                            <DialogDescription>
                                                                Bạn có chắc chắn muốn xoá task này không? Hành động này không thể hoàn tác.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="flex justify-end gap-2">
                                                            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                                                                Huỷ
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                onClick={confirmDelete}
                                                            >
                                                                Xoá
                                                            </Button>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ) : null
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
                <Link to='/admin/add-salary'>
                    <Button variant="outline" size="sm" >
                        Thêm nhân viên
                    </Button>
                </Link>
            </div>
        </div>
    )
}

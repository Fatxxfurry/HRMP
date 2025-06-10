//Trang AdminInfo: Chứa thông tin tổng quan cho Admin
import { Eye, Edit, Trash2, Calendar } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import NotificationHistory from "@/components/defined/NotificationHistory"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Link } from "react-router"
import { useNavigate } from "react-router"
import axios from "axios"
import { useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
{/*const formSchema = z.object({
    id: z.string(),
    name: z.string(),
    phone: z.string(),
    birth_date: z.string(),
    email: z.string(),
    address: z.string(),
    position: z.string(),
    identification: z.string(),
})*/}
interface Department {
    id: number,
    name: string,
    managerId: number
}
interface Employee {
    id: number,
    name: string,
    age: number,
    phone: string,
    birth_date: string,
    hire_date: string,
    email: string,
    address: string,
    department: Department,
    position: string,
    identification: string,
    role: string,
    bank: string,
    bank_number: string,
    insurance: string,
}

export default function AdminInfo() {
    const [nameFilter, setNameFilter] = useState("")
    const [departmentFilter, setDepartmentFilter] = useState("")
    const [positionFilter, setPositionFilter] = useState("")
    const [editEmployee, seteditEmployee] = useState<Employee | null>(null);
    const [deleteEmployeeId, setdeleteEmployeeId] = useState<Employee | null>(null);
    const [showEditDialog, setShowEditDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [employeeInfo, setEmployeeInfo] = useState<Employee[]>([]);
    const { user } = useAuth()
    const navigate = useNavigate()


    useEffect(() => {
        loadEmployee();

    }, [user]);
    const loadEmployee = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/employees");
            const data: Employee[] = response.data;
            setEmployeeInfo(data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách nhân viên:", error);
        }
    };


    const handleClickTable = (id: number) => {
        navigate(`/admin/employee-detail/${id}`);
    };
    const handleEdit = (id: number) => {
        navigate(`/admin/edit-employee/${id}`);

    };


    const handleDelete = (employee: Employee) => {
        setdeleteEmployeeId(employee);
        setShowDeleteDialog(true);
    };
    const confirmDelete = async () => {
        try {
            if (deleteEmployeeId) {
                await axios.delete(`http://localhost:8080/api/employees/${deleteEmployeeId.id}`);
                // Xóa khỏi UI sau khi xóa backend thành công
                setEmployeeInfo((prev) => prev.filter((e) => e.id !== deleteEmployeeId.id));
                setShowDeleteDialog(false);
                setdeleteEmployeeId(null);
            }
        } catch (error) {
            console.error("Lỗi khi xóa nhân viên:", error);
        }
    };
    function handleAdd() {

    }
    const form = useForm({
        defaultValues: {
            id: 999,
            name: "",
            phone: "",
            birth_date: "",
            email: "",
            address: "",
            position: "",
            identification: "",
        },
    })


    // Get unique departments and positions for filter dropdowns

    const departments = [...new Set(employeeInfo.map((emp) => emp.department?.name))];
    const positions = [...new Set(employeeInfo.map((emp) => emp.position))];


    // Filter the data based on current filter values
    const filteredData = employeeInfo.filter((employee) => {
        const nameMatch = employee.name.toLowerCase().includes(nameFilter.toLowerCase());
        const departmentMatch = !departmentFilter || employee.department?.name === departmentFilter;
        const positionMatch = !positionFilter || employee.position === positionFilter;
        return nameMatch && departmentMatch && positionMatch;
    });
    const clearFilters = () => {
        setNameFilter("")
        setDepartmentFilter("")
        setPositionFilter("")
    }
    return (

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-[#F0F0EF] md:min-h-min" >
                <ScrollArea className=" rounded-md border p-4">
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
                        <Table className="w-full">
                            <TableCaption>Danh sách nhân viên.</TableCaption>
                            <TableHeader className="bg-[#2D2D38] border-b-2 text-white">
                                <TableRow className="divide-x divide-slate-200">
                                    <TableHead className="font-semibold text-white px-4 py-3">Mã nhân viên</TableHead>
                                    <TableHead className="font-semibold text-white px-4 py-3">Tên nhân viên</TableHead>
                                    <TableHead className="font-semibold text-white px-4 py-3">Số điện thoại</TableHead>
                                    <TableHead className="font-semibold text-white px-4 py-3">Ngày sinh</TableHead>
                                    <TableHead className="font-semibold text-white px-4 py-3">Email</TableHead>
                                    <TableHead className="font-semibold text-white px-4 py-3">Địa chỉ</TableHead>
                                    <TableHead className="font-semibold text-white px-4 py-3">Ngày gia nhập</TableHead>
                                    <TableHead className="font-semibold text-white px-4 py-3">Phòng ban</TableHead>
                                    <TableHead className="font-semibold text-white px-4 py-3">Vị trí</TableHead>
                                    <TableHead className="font-semibold text-white px-4 py-3">Thao tác</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((employee) => (
                                        <TableRow key={employee.id}>
                                            <TableCell className="font-medium">{employee.id}</TableCell>
                                            <TableCell>{employee?.name}</TableCell>
                                            <TableCell>{employee.phone}</TableCell>
                                            <TableCell>{employee.birth_date}</TableCell>
                                            <TableCell>{employee.email}</TableCell>
                                            <TableCell>{employee.address}</TableCell>
                                            <TableCell>{employee.hire_date}</TableCell>
                                            <TableCell>{employee.department?.name}</TableCell>
                                            <TableCell>{employee.position}</TableCell>
                                            <TableCell className="space-x-2">
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600"
                                                    onClick={(event) => {
                                                        event.stopPropagation(); // Ngăn sự kiện click lan lên TableRow
                                                        handleEdit(employee.id);    // Gọi logic sửa
                                                    }}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>

                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                                                    onClick={() => handleDelete(employee)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                                                    onClick={() => handleClickTable(employee.id)}>
                                                    <Eye className="h-4 w-4" />
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
                        <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <Link to='/admin/add-employee'>
                    <Button variant="outline" size="sm" className="m-4 bg-[#212021] text-white">
                        Thêm nhân viên
                    </Button>
                </Link>
        </div>
        </div >
    )
}

//Trang AdminInfo: Chứa thông tin tổng quan cho Admin

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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Link } from "react-router"
import { useNavigate } from "react-router"
import axios from "axios"
import { useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
const formSchema = z.object({
    id: z.string(),
    name: z.string(),
    phone: z.string(),
    birth_date: z.string(),
    email: z.string(),
    address: z.string(),
    department: z.string(),
    position: z.string()
})
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
    const handleEdit = (employee: Employee) => {
        seteditEmployee(employee);
        setShowEditDialog(true);
        form.reset({
            id: employee.id.toString(),
            name: employee?.name,
            phone: employee.phone,
            birth_date: employee.birth_date,
            email: employee.email,
            address: employee.address,
            department: employee.department?.name,
            position: employee.position,
        });
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
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: "",
            name: "",
            phone: "",
            birth_date: "",
            email: "",
            address: "",
            department: "",
            position: ""
        },
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log("Submit:", values);
        // TODO: Gọi API cập nhật
        setShowEditDialog(false);
    };
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
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
                <ScrollArea className="rounded-md border p-4">
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
                    <Table >
                        <TableCaption>Danh sách nhân viên.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead >Mã nhân viên</TableHead>
                                <TableHead>Tên nhân viên</TableHead>
                                <TableHead>Số điện thoại</TableHead>
                                <TableHead>Ngày sinh</TableHead>
                                <TableHead >Email</TableHead>
                                <TableHead >Địa chỉ</TableHead>
                                <TableHead >Phòng ban</TableHead>
                                <TableHead >Vị trí</TableHead>
                                <TableHead >Thao tác</TableHead>

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
                                        <TableCell>{employee.department?.name}</TableCell>
                                        <TableCell>{employee.position}</TableCell>
                                        <TableCell className="space-x-2">
                                            <Button variant="outline" size="sm" onClick={(event) => {
                                                event.stopPropagation(); // Ngăn sự kiện click lan lên TableRow
                                                handleEdit(employee);    // Gọi logic sửa
                                            }}>
                                                Sửa
                                            </Button>
                                            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Sửa Task</DialogTitle>
                                                    </DialogHeader>
                                                    {editEmployee && (
                                                        <form onSubmit={form.handleSubmit(onSubmit)}>
                                                            <div className="space-y-2">
                                                                <Input
                                                                    defaultValue={editEmployee.id}
                                                                    {...form.register("id")}
                                                                    placeholder="ID"
                                                                />
                                                                <Input
                                                                    defaultValue={editEmployee.name}
                                                                    {...form.register("name")}
                                                                    placeholder="Tên nhân viên"
                                                                />
                                                                <Input
                                                                    defaultValue={editEmployee.phone}
                                                                    {...form.register("phone")}
                                                                    placeholder="Số điện thoại"
                                                                />
                                                                <Input
                                                                    defaultValue={editEmployee.birth_date}
                                                                    {...form.register("birth_date")}
                                                                    placeholder="Ngày sinh"
                                                                />
                                                                <Input
                                                                    defaultValue={editEmployee.email}
                                                                    {...form.register("email")}
                                                                    placeholder="Email"
                                                                />
                                                                <Input
                                                                    defaultValue={editEmployee.address}
                                                                    {...form.register("address")}
                                                                    placeholder="Địa chỉ"
                                                                />
                                                                <Input
                                                                    defaultValue={editEmployee.department.name}
                                                                    {...form.register("department")}
                                                                    placeholder="Phòng ban"
                                                                />
                                                                <Input
                                                                    defaultValue={editEmployee.position}
                                                                    {...form.register("position")}
                                                                    placeholder="Vị trí"
                                                                />
                                                                {/* Các trường khác tương tự */}
                                                                <Button type="submit">Lưu thay đổi</Button>
                                                            </div>
                                                        </form>
                                                    )}
                                                </DialogContent>
                                            </Dialog>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(employee)}>
                                                Xóa
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => handleClickTable(employee.id)}>
                                                Xem
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

                </ScrollArea>
                <Link to='/admin/add-employee'>
                    <Button variant="outline" size="sm" >
                        Thêm nhân viên
                    </Button>
                </Link>

            </div>
        </div>
    )
}

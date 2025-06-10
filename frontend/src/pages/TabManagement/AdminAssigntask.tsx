// Quán lí task và giao task của admin

"use client"
import { Eye, Edit, Trash2, Trash } from "lucide-react"
import * as React from 'react'
import { useState } from 'react'
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
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format, set } from "date-fns"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { parse } from 'path'
import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'
import { toast } from "sonner"


interface Task {
    id: number,
    description: string,
    finished: boolean,
    name: string,
    employee: {
        id: number,
        name: string,
    }
    project: {
        id: number,
        name: string,
        involededDepartments: {
            id: number,
            name: string,
        }
    }
    end_date: string,
    start_date: string
}

export default function AdminAssigntask() {
    const [editTask, setEditTask] = useState<Task | null>(null)
    const [deleteTask, setDeleteTask] = useState<Task | null>(null)
    const [showEditDialog, setShowEditDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [newTaskData, setNewTaskData] = useState<Task | null>(null)
    const [TaskProjectdata, setTaskProjectData] = useState<Task[]>([])

    //Create Task Schema
    const [newTaskName, setNewTaskName] = useState("")
    const [newTaskDescription, setNewTaskDescription] = useState("")
    const [newTaskStartDate, setNewTaskStartDate] = useState("")
    const [newTaskEndDate, setNewTaskEndDate] = useState("")
    const [newTaskEmployeeId, setNewTaskEmployeeId] = useState(0)
    const [newTaskProjectId, setNewTaskProjectId] = useState(0)
    //Edit 
    const [EditTaskName, setEditTaskName] = useState("")
    const [EditTaskDescription, setEditTaskDescription] = useState("")
    const [EditTaskStartDate, setEditTaskStartDate] = useState("")
    const [EditTaskEndDate, setEditTaskEndDate] = useState("")
    const [EditTaskEmployeeId, setEditTaskEmployeeId] = useState(0)
    const [EditTaskProjectId, setEditTaskProjectId] = useState(0)

    const { user } = useAuth()
    useEffect(() => {
        if (user?.id) {
            loadTaskData()
        }
    }, [user])
    const loadTaskData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/tasks")
            if (response.status === 200) {
                setTaskProjectData(response.data)
                console.log("Task data loaded successfully:", response.data)
            } else {
                console.error("Failed to fetch task data")
            }
        } catch (error) {
            console.error("Error fetching task data:", error)
        }
    }
    const AssignNewTask = async () => {
        const payload = {
            name: newTaskName,
            description: newTaskDescription,
            start_date: newTaskStartDate,
            end_date: newTaskEndDate,
            finished: false,
            employee: {
                id: newTaskEmployeeId
            },
            project: {
                id: newTaskProjectId
            }
        }
        try {
            const response = await axios.post("http://localhost:8080/api/tasks", payload)
            if (response.status === 200 || response.status === 201) {
                toast("Phân công task thành công")
                loadTaskData()
            } else {
                toast("Phân công task thất bại")
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }
    const UpdateTask = async () => {
        if (editTask) {
            const payload = {
                name: EditTaskName,
                description: EditTaskDescription,
                start_date: EditTaskStartDate,
                end_date: EditTaskEndDate,
                finished: editTask.finished,
                employee: {
                    id: EditTaskEmployeeId
                },
                project: {
                    id: EditTaskProjectId
                }
            }
            try {
                const response = await axios.put(`http://localhost:8080/api/tasks/${editTask.id}`, payload)
                if (response.status === 200) {
                    toast("Cập nhật task thành công")
                    setShowEditDialog(false)
                    console.log("Task updated successfully:", response.data)
                    loadTaskData() // Reload task data after update
                } else {
                    toast("Cập nhật task thất bại")
                }
            } catch (error) {
                console.error("Error updating task:", error)
                toast("Lỗi khi cập nhật task")
            }
        }
    }

    function handleEdit(task: Task) {
        setEditTask(task);
        setEditTaskName(task.name);
        setEditTaskDescription(task.description);
        setEditTaskStartDate(task.start_date);
        setEditTaskEndDate(task.end_date);
        setEditTaskEmployeeId(task.employee.id);
        setEditTaskProjectId(task.project.id);
        setShowEditDialog(true);
    }

    const handleDelete = (task: Task) => {
        setDeleteTask(task);
        setShowDeleteDialog(true);
    };

    const confirmDelete = async () => {
        if (deleteTask) {
            try {
                const response = await axios.delete(`http://localhost:8080/api/tasks/${deleteTask.id}`);
                if (response.status === 200) {
                    toast("Xoá task thành công");
                    setShowDeleteDialog(false);
                    loadTaskData(); // Reload task data after deletion
                } else {
                    toast("Xoá task thất bại");
                }
            } catch (error) {
                console.error("Error deleting task:", error);
                toast("Lỗi khi xoá task");
            }
        }
    }

    function onSubmit() {
        AssignNewTask()
    }
    const [projectfilter, setprojectfilter] = useState("")
    const projects = [...new Set(TaskProjectdata.map((project) => project.project?.name))]
    const filteredData = TaskProjectdata.filter((project) => {
        const projectMatch = !projectfilter || project.project?.name === projectfilter
        return projectMatch
    })
    const clearFilters = () => {
        setprojectfilter("")

    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                <div className="aspect-auto rounded-xl bg-[#F0F0EF] p-4" >
                    <div className="flex flex-row gap-4  mb-2">
                        <Select value={projectfilter} onValueChange={setprojectfilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Tên dự án" />
                            </SelectTrigger>
                            <SelectContent>
                                {projects.map((pro) => (
                                    <SelectItem key={pro} value={pro} >
                                        {pro}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {projectfilter && (
                            <div className="space-y-2">
                                <Button variant="outline" className="" onClick={clearFilters}>
                                    <X className="h-4 w-4 mr-2" />
                                    Xóa bộ lọc
                                </Button>
                            </div>

                        )}
                    </div>
                    <ScrollArea className="h-[250px] rounded-md border p-4">
                        <Table >
                            <TableCaption>Danh sách task và dự án tương ứng.</TableCaption>
                            <TableHeader className="bg-[#2D2D38] border-b-2 text-white">
                                <TableRow className="divide-x divide-slate-200">
                                    <TableHead className="font-semibold text-white px-4 py-3">Mã Task</TableHead>
                                    <TableHead className="font-semibold text-white px-4 py-3">Tên Task</TableHead>
                                    <TableHead className="font-semibold text-white px-4 py-3">Tên dự án</TableHead>
                                    <TableHead className="font-semibold text-white px-4 py-3">Ngày bắt đầu</TableHead>
                                    <TableHead className="font-semibold text-white px-4 py-3">Deadline</TableHead>
                                    <TableHead className="font-semibold text-white px-4 py-3">Trạng thái</TableHead>
                                    <TableHead className="font-semibold text-white px-4 py-3">Nhân viên thực hiện</TableHead>
                                    <TableHead className="font-semibold text-white px-4 py-3">Phòng ban quản lí</TableHead>
                                    <TableHead className="font-semibold text-white px-4 py-3">Thao tác</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((task) => (
                                        <TableRow key={task.id}>
                                            <TableCell className="font-medium">{task.id}</TableCell>
                                            <TableCell>{task.name}</TableCell>
                                            <TableCell>{task.project?.name}</TableCell>
                                            <TableCell>{task.start_date}</TableCell>
                                            <TableCell>{task.end_date}</TableCell>
                                            <TableCell>{task.finished}</TableCell>
                                            <TableCell>{task.employee.name}</TableCell>
                                            <TableCell>{task.project?.involededDepartments?.name}</TableCell>
                                            <TableCell className="space-x-2">
                                                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600" size="sm" onClick={() => handleEdit(task)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Sửa Task</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="space-y-2">
                                                            <Input
                                                                value={EditTaskName}
                                                                onChange={(e) => setEditTaskName(e.target.value)}
                                                                placeholder="Tên Task"
                                                            />
                                                            <Input
                                                                value={EditTaskProjectId}
                                                                onChange={(e) => setEditTaskProjectId(Number(e.target.value))}
                                                                placeholder="ID Dự Án"
                                                            />
                                                            <Input
                                                                value={EditTaskEmployeeId}
                                                                onChange={(e) => setEditTaskEmployeeId(Number(e.target.value))}
                                                                placeholder="Mã Nhân viên"
                                                            />
                                                            <Textarea
                                                                value={EditTaskDescription}
                                                                onChange={(e) => setEditTaskDescription(e.target.value)}
                                                                placeholder="Mô tả"
                                                            />
                                                            <Input
                                                                type="date"
                                                                value={EditTaskStartDate}
                                                                onChange={(e) => setEditTaskStartDate(e.target.value)}
                                                                placeholder="Ngày bắt đầu"
                                                            />
                                                            <Input
                                                                type="date"
                                                                value={EditTaskEndDate}
                                                                onChange={(e) => setEditTaskEndDate(e.target.value)}
                                                                placeholder="Ngày kết thúc"
                                                            />
                                                            <div className="flex justify-center mt-4">

                                                                <Button type="submit" onClick={() => UpdateTask()}>Lưu thay đổi</Button>
                                                            </div>
                                                        </div>

                                                    </DialogContent>
                                                </Dialog>
                                                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600" size="sm" onClick={() =>
                                                    handleDelete(task)}>
                                                    <Trash2 className="h-4 w-4" />
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
                                                                onClick={() => {
                                                                    confirmDelete()
                                                                    setShowDeleteDialog(false)
                                                                }}
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
                </div>

            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                <div className="aspect-video rounded-xl bg-[#F0F0EF] p-4" >
                    {/* Tên project */}
                    <div>
                        <label className="block mb-1">Project ID</label>
                        <Input
                            placeholder="Nhập tên project"
                            value={newTaskProjectId}
                            onChange={(e) => setNewTaskProjectId(Number(e.target.value))}
                        />
                    </div>

                    {/* Tên task */}
                    <div>
                        <label className="block mb-1">Tên Task</label>
                        <Input
                            placeholder="Nhập tên project"
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                        />
                    </div>

                    {/* Mô tả */}
                    <div>
                        <label className="block mb-1">Mô tả task</label>
                        <Textarea
                            className="min-h-[120px]"
                            id="description"
                            rows={5}
                            placeholder="Mô tả task"
                            value={newTaskDescription}
                            onChange={(e) => setNewTaskDescription(e.target.value)}
                        />
                    </div>
                    {/* Ngày bắt đầu */}
                    <div>
                        <label className="block mb-1">Nhập ngày bắt đầu</label>
                        <Input
                            type="date"
                            placeholder="Nhập ngày bắt đầu"
                            value={newTaskStartDate}
                            onChange={(e) => setNewTaskStartDate(e.target.value)}
                        />
                    </div>

                    {/* Deadline */}
                    <div>
                        <label className="block mb-1">Nhập ngày kết thúc</label>
                        <Input
                            type="date"
                            placeholder="Nhập ngày kết thúc"
                            value={newTaskEndDate}
                            onChange={(e) => setNewTaskEndDate(e.target.value)}
                        />
                    </div>
                    {/* Mã nhân viên */}
                    <div>
                        <label className="block mb-1">Mã nhân viên</label>
                        <Input
                            placeholder="Nhập Mã nhân viên"
                            value={newTaskEmployeeId}
                            onChange={(e) => setNewTaskEmployeeId(Number(e.target.value))} />
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button type="submit" onClick={onSubmit}>Giao task</Button>
                    </div>
                </div>




            </div >


        </div >
    )
}

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Line, LineChart, Pie, PieChart } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import axios from "axios"
import { stat } from "fs"
const chartConfig = {
    active: {
        label: "Active",
        color: "hsl(var(--chart-1))",
    },
    unactive: {
        label: "Unactive",
        color: "hsl(var(--chart-2))",
    }
} satisfies ChartConfig
const ProjectCompletionchartConfig = {
    finished: {
        label: "Finished",
        color: "hsl(var(--chart-1))",
    },
    unfinished: {
        label: "Unfinished",
        color: "hsl(var(--chart-2))",
    }
} satisfies ChartConfig

const projects = [
    {
        name: "Dự án A",
        data: [
            { status: "finished", number: 80, fill: "hsl(var(--chart-2))" },
            { status: "unfinished", number: 20, fill: "hsl(var(--chart-3))" },
        ],
    },
    {
        name: "Dự án B",
        data: [
            { status: "finished", number: 60, fill: "hsl(var(--chart-2))" },
            { status: "unfinished", number: 40, fill: "hsl(var(--chart-3))" },
        ],
    },
];
const TaskProjectdata = [
    { id: "1", name: "Center a div", projectname: "Website cho FPT", date: "1/1/2024", deadline: "1/1/2025", status: "Hoàn thành" },
    { id: "2", name: "Delete database", projectname: "Website cho FPT", date: "1/1/2024", deadline: "1/1/2025", status: "Đang thực hiện" },
    { id: "3", name: "Sell data", projectname: "Website cho FPT", date: "1/1/2024", deadline: "1/1/2025", status: "Đang thực hiện" },
]
interface Employee {
    id: number
    name: string
    email: string
    // bạn có thể thêm các trường khác nếu cần
}

interface Task {
    id: number
    name: string
    description: string
    employee: Employee | null
    project: Project
    start_date: string | null
    end_date: string | null
    finished: boolean
}
interface Project {
    id: number,
    name: string,
    finished: boolean,
    start_date: Date,
    end_date: Date,
}
export default function EmployeeManagement() {
    const [selectedProject, setSelectedProject] = useState(projects[0]);
    const [showEditDialog, setShowEditDialog] = useState(false)
    const [employeeTaskInfo, setEmployeeTaskInfo] = useState<Task[]>([])
    const [status, setStatus] = useState('')
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)


    const { user } = useAuth()
    useEffect(() => {
        loadEmployeeTaskInfo()
    }, [user])
    const loadEmployeeTaskInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/tasks`)
            if (!response) {
                throw new Error('Failed to fetch employee task info')
            }
            const data: Task[] = response.data
            const filteredTasks = data.filter(task => task.employee?.id === user?.id)

            setEmployeeTaskInfo(filteredTasks)
        } catch (error) {
            console.error('Error fetching employee task info:', error)
        }

    }
        const handleUpdateStatus = (value: string) => {
            const finishedValue = value === 'finished';

            if (!selectedTask) return;

            axios.put(`http://localhost:8080/api/tasks/${selectedTask?.id}`, {
                finished: finishedValue,
            })
                .then(response => {
                    console.log('Task updated successfully:', response.data);
                setShowEditDialog(false);
                loadEmployeeTaskInfo();

            })
            .catch(error => {
                console.error('Error updating task:', error);
            });
    };

    
    const handleSelectChange = (value: string) => {
        const project = projects.find(p => p.name === value);
        if (project) setSelectedProject(project);
    };
    const getTaskCompletionData = (tasks: Task[]) => {
        const finished = tasks.filter(task => task.finished).length
        const unfinished = tasks.length - finished
        return [
            { status: "finished", number: finished, fill: "hsl(var(--chart-2))" },
            { status: "unfinished", number: unfinished, fill: "hsl(var(--chart-3))" },
        ]
    }
    const TaskCompletionData = employeeTaskInfo
        ? getTaskCompletionData(employeeTaskInfo)
        : [
            { status: "finished", number: 0, fill: "hsl(var(--chart-2))" },
            { status: "unfinished", number: 0, fill: "hsl(var(--chart-3))" },
        ]


    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                <div className="aspect-video rounded-xl bg-muted/50">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Tiến độ dự án</CardTitle>
                        <CardDescription></CardDescription>
                        <div className="w-full mt-4">
                            <Select onValueChange={handleSelectChange} defaultValue={selectedProject.name}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn dự án" />
                                </SelectTrigger>
                                <SelectContent>
                                    {projects.map((project) => (
                                        <SelectItem key={project.name} value={project.name}>
                                            {project.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square max-h-[250px]"
                        >
                            <PieChart>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                <Pie
                                    data={selectedProject.data}
                                    dataKey="number"
                                    nameKey="status"
                                />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50" >
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Tổng số task đã hoàn thành</CardTitle>
                        <CardDescription></CardDescription>
                        <div className="w-full mt-4"></div>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={ProjectCompletionchartConfig}
                            className="mx-auto aspect-square max-h-[250px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie data={TaskCompletionData} dataKey="number" nameKey="status" />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </div>
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
                <ScrollArea className="h-[250px] rounded-md border p-4">
                    <Table >
                        <TableCaption>Danh sách task của nhân viên {user?.id}.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead >Mã Task</TableHead>
                                <TableHead>Tên Task</TableHead>
                                <TableHead>Tên dự án</TableHead>
                                <TableHead>Ngày bắt đầu</TableHead>
                                <TableHead >Deadline</TableHead>
                                <TableHead >Trạng thái</TableHead>
                                <TableHead >Thao tác</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employeeTaskInfo && employeeTaskInfo.length > 0 ? (
                                employeeTaskInfo.map((task: Task) => (
                                    <TableRow key={task.id}>
                                        <TableCell className="font-medium">{task.id}</TableCell>
                                        <TableCell>{task.name}</TableCell>
                                        <TableCell>{task.project.name}</TableCell>
                                        <TableCell>{task.start_date}</TableCell>
                                        <TableCell>{task.end_date}</TableCell>
                                        <TableCell>
                                            {task.finished ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setSelectedTask(task);        // ✅ Lưu task đang chọn
                                                    setShowEditDialog(true);     // ✅ Hiển thị Dialog chỉnh sửa
                                                }}
                                            >
                                                Cập nhật
                                            </Button>
                                            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Cập nhật tiến độ</DialogTitle>
                                                        <DialogDescription>
                                                            Bạn có chắc chắn muốn cập nhật tiến độ không? Hành động này không thể hoàn tác
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="flex justify-center mt-4">
                                                        <Select onValueChange={(value) => setStatus(value)}>
                                                            <SelectTrigger className="w-[150px]">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="finished">Hoàn thành</SelectItem>
                                                                <SelectItem value="unfinished">Đang thực hiện</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                                                            Huỷ
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            onClick={() => {
                                                                handleUpdateStatus(status)
                                                            }}
                                                        >
                                                            Cập nhật
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

    )
}

//Trang quản lí tổng quan dự án, task cho admin

"use client"
import * as React from "react"
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Line, LineChart, Pie, PieChart } from "recharts"
import { Input } from "@/components/ui/input";
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

import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect } from "react";
import axios from "axios"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext";
const ActiveUnactiveData = [
    { status: "active", number: 70, fill: "hsl(var(--chart-1))" },
    { status: "unactive", number: 30, fill: "hsl(var(--chart-2))" },
]

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


interface Project {
    id: string;
    end_date: string;
    name: string;
    start_date: string;
    status: string;
    finished: boolean;
}
interface Task {
    id: number;
    end_date: string;
    name: string;
    description: string;
    project: Project;
    start_date: string;
    status: string;
    finished: boolean;
    employee: Employee
}
interface Employee {
    id: number,
    name: string,
}
export default function AdminManagement() {
    const [searchProject, setSearchProject] = useState("");
    const [searchTask, setSearchTask] = useState("");
    const [projectData, setProjectData] = useState<Project[]>([])
    const [projectstatus, setprojectStatus] = useState('')
    const [taskstatus, settaskStatus] = useState('')
    const [showProjectDialog, setShowProjectDialog] = useState(false)
    const [showTaskDialog, setShowTaskDialog] = useState(false)

    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [taskData, settaskData] = useState<Task[]>([])
    const { user } = useAuth()
    // Lọc dữ liệu theo từ khóa
   
    useEffect(() => {
        loadProjectsInfo()
        loadEmployeeTaskInfo()
    }, [user])
    const loadProjectsInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/projects`)
            if (!response) {
                throw new Error('Failed to fetch employee task info')
            }
            const data: Project[] = response.data
            setProjectData(data)
        } catch (error) {
            console.error('Error fetching employee task info:', error)
        }

    }
    const handleUpdateStatus =  (value: string) => {
        const finishedValue = value === 'finished';

        if (!selectedProject) return;

        axios.put(`http://localhost:8080/api/projects/${selectedProject?.id}`, {
            finished: finishedValue,
        })
            .then(async response => {
                console.log('Task updated successfully:', response.data);
                await loadProjectsInfo();
                setShowProjectDialog(false);
            })
            .catch(error => {
                console.error('Error updating task:', error);
            });
    };



    const loadEmployeeTaskInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/tasks`)
            if (!response) {
                throw new Error('Failed to fetch employee task info')
            }
            const data: Task[] = response.data
            settaskData(data)
        } catch (error) {
            console.error('Error fetching employee task info:', error)
        }
    }
    const handleUpdateTaskStatus = (value: string) => {
        const finishedValue = value === 'finished';

        if (!selectedTask) return;

        axios.put(`http://localhost:8080/api/tasks/${selectedTask?.id}`, {
            finished: finishedValue,
        })
            .then(async response => {
                console.log('Task updated successfully:', response.data);
                await loadEmployeeTaskInfo();
                setShowTaskDialog(false);
            })
            .catch(error => {
                console.error('Error updating task:', error);
            });
    };
    const getTaskCompletionData = (tasks: Task[]) => {
        const finished = tasks.filter(task => task.finished).length
        const unfinished = tasks.length - finished
        return [
            { status: "finished", number: finished, fill: "hsl(var(--chart-2))" },
            { status: "unfinished", number: unfinished, fill: "hsl(var(--chart-3))" },
        ]
    }
    const TaskCompletionData = taskData
        ? getTaskCompletionData(taskData)
        : [
            { status: "finished", number: 0, fill: "hsl(var(--chart-2))" },
            { status: "unfinished", number: 0, fill: "hsl(var(--chart-3))" },
        ]
    const getProjectCompletionData = (projects: Project[]) => {
        const finished = projects.filter(project => project.finished).length
        const unfinished = projects.length - finished
        return [
            { status: "finished", number: finished, fill: "hsl(var(--chart-2))" },
            { status: "unfinished", number: unfinished, fill: "hsl(var(--chart-3))" },
        ]
    }
    const ProjectCompletionData = projectData
        ? getProjectCompletionData(projectData)
        : [
            { status: "finished", number: 0, fill: "hsl(var(--chart-2))" },
            { status: "unfinished", number: 0, fill: "hsl(var(--chart-3))" },
        ]
     const filteredData = projectData.filter((item) =>
        `${item.id} ${item.name} ${item.status}`
            .toLowerCase()
            .includes(searchProject.toLowerCase())
    );
    const TaskfilteredData = taskData.filter((item) =>
        `${item.id} ${item.name} ${item.status} ${item.name} ${item.end_date}`
            .toLowerCase()
            .includes(searchTask.toLowerCase())
    );
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50 p-4" >
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Tình trạng active - unactive của nhân viên</CardTitle>
                        <CardDescription>January - June 2024</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square max-h-[250px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie data={ActiveUnactiveData} dataKey="number" nameKey="status" />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50 p-4" >
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Tiến độ dự án</CardTitle>
                        <CardDescription>January - June 2024</CardDescription>
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
                                <Pie data={ProjectCompletionData} dataKey="number" nameKey="status" />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50 p-4 " >
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Tiến độ task</CardTitle>
                        <CardDescription>January - June 2024</CardDescription>
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
            <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                <div className=" rounded-xl bg-muted/50 p-4" >
                    <Input
                        placeholder="Tìm kiếm dự án..."
                        value={searchProject}
                        onChange={(e) => setSearchProject(e.target.value)}
                        className="mb-4 w-full max-w-sm"
                    />
                    <ScrollArea className=" h-[500px] rounded-md border p-4">

                        <Table className="min-w-[500px]" >
                            <TableCaption>Danh sách tình trạng chấm công của nhân viên.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead >Mã dự án</TableHead>
                                    <TableHead>Tên dự án</TableHead>
                                    <TableHead>Ngày bắt đầu</TableHead>
                                    <TableHead >Deadline</TableHead>
                                    <TableHead >Trạng thái</TableHead>
                                    <TableHead>Thao tác</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((project) => (
                                        <TableRow key={project.id}>
                                            <TableCell className="font-medium">{project.id}</TableCell>
                                            <TableCell>{project.name}</TableCell>
                                            <TableCell>{project.start_date}</TableCell>
                                            <TableCell>{project.end_date}</TableCell>
                                            <TableCell>

                                                {project.finished ? "Hoàn thành" : "Đang thực hiện"}

                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setSelectedProject(project);        // ✅ Lưu task đang chọn
                                                        setShowProjectDialog(true);     // ✅ Hiển thị Dialog chỉnh sửa
                                                    }}
                                                >
                                                    Cập nhật
                                                </Button>
                                                <Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Cập nhật tiến độ dự án</DialogTitle>
                                                            <DialogDescription>
                                                                Bạn có chắc chắn muốn cập nhật tiến độ dự án không?
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="flex justify-center mt-4">
                                                            <Select onValueChange={(value) => setprojectStatus(value)}>
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
                                                            <Button variant="outline" onClick={() => setShowProjectDialog(false)}>
                                                                Huỷ
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                onClick={() => {
                                                                    handleUpdateStatus(projectstatus)
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
                <div className="aspect-video rounded-xl bg-muted/50 p-4" >
                    <Input
                        placeholder="Tìm kiếm task..."
                        value={searchTask}
                        onChange={(e) => setSearchTask(e.target.value)}
                        className="mb-4 w-full max-w-sm"
                    />
                    <ScrollArea className="overflow-auto h-[250px] rounded-md border p-4">
                        <Table >
                            <TableCaption>Danh sách task và dự án tương ứng.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead >Mã Task</TableHead>
                                    <TableHead>Mô tả Task</TableHead>
                                    <TableHead>Tên dự án</TableHead>
                                    <TableHead>Ngày bắt đầu</TableHead>
                                    <TableHead >Deadline</TableHead>
                                    <TableHead >Trạng thái</TableHead>
                                    <TableHead>Thao tác</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {TaskfilteredData.length > 0 ? (
                                    TaskfilteredData.map((task) => (
                                        <TableRow key={task.id}>
                                            <TableCell className="font-medium">{task.id}</TableCell>
                                            <TableCell>{task.description}</TableCell>
                                            <TableCell>{task.project.name}</TableCell>
                                            <TableCell>{task.start_date}</TableCell>
                                            <TableCell>{task.end_date}</TableCell>
                                            <TableCell>
                                                {task.finished ? "Hoàn thành" : "Đang thực hiện"}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setSelectedTask(task);        // ✅ Lưu task đang chọn
                                                        setShowTaskDialog(true);     // ✅ Hiển thị Dialog chỉnh sửa
                                                    }}
                                                >
                                                    Cập nhật
                                                </Button>
                                                <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Cập nhật tiến độ dự án</DialogTitle>
                                                            <DialogDescription>
                                                                Bạn có chắc chắn muốn cập nhật tiến độ dự án không?
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="flex justify-center mt-4">
                                                            <Select onValueChange={(value) => settaskStatus(value)}>
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
                                                            <Button variant="outline" onClick={() => setShowTaskDialog(false)}>
                                                                Huỷ
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                onClick={() => {
                                                                    handleUpdateTaskStatus(taskstatus)
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

            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min overflow-auto max-h-screen" >


            </div>

        </div>
    )
}



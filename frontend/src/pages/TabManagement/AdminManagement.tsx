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

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

const ActiveUnactiveData = [
    { status: "active", number: 70, fill: "hsl(var(--chart-1))" },
    { status: "unactive", number: 30, fill: "hsl(var(--chart-2))" },
]
const ProjectCompletionData = [
    { status: "finished", number: 70, fill: "hsl(var(--chart-2))" },
    { status: "unfinished", number: 30, fill: "hsl(var(--chart-3))" },
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

const Projectdata = [
    { id: "1", name: "Website cho FPT", date: "1/1/2024", deadline: "1/1/2025", status: "Hoàn thành" },
    { id: "2", name: "Website cho Google", date: "1/1/2024", deadline: "1/1/2025", status: "Đang thực hiện" },
    { id: "3", name: "Website cho Facebook", date: "1/1/2024", deadline: "1/1/2025", status: "Đang thực hiện" },
    { id: "4", name: "Website cho Amazon", date: "1/1/2024", deadline: "1/1/2025", status: "Đang thực hiện" },
]
const TaskProjectdata = [
    { id: "1", name: "Center a div", projectname: "Website cho FPT", date: "1/1/2024", deadline: "1/1/2025", status: "Hoàn thành" },
    { id: "2", name: "Delete database", projectname: "Website cho FPT", date: "1/1/2024", deadline: "1/1/2025", status: "Đang thực hiện" },
    { id: "3", name: "Sell data", projectname: "Website cho FPT", date: "1/1/2024", deadline: "1/1/2025", status: "Đang thực hiện" },
]

export default function AdminTimekeeping() {
    const [searchProject, setSearchProject] = useState("");
    const [searchTask, setSearchTask] = useState("");

    // Lọc dữ liệu theo từ khóa
    const filteredData = Projectdata.filter((item) =>
        `${item.id} ${item.name} ${item.status}`
            .toLowerCase()
            .includes(searchProject.toLowerCase())
    );
    const TaskfilteredData = TaskProjectdata.filter((item) =>
        `${item.id} ${item.name} ${item.status} ${item.projectname} ${item.deadline}`
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
                                <Pie data={ProjectCompletionData} dataKey="number" nameKey="status" />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </div>


            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                <div className="aspect-video rounded-xl bg-muted/50 p-4" >
                    <Input
                        placeholder="Tìm kiếm dự án..."
                        value={searchProject}
                        onChange={(e) => setSearchProject(e.target.value)}
                        className="mb-4 w-full max-w-sm"
                    />
                    <ScrollArea className="h-[250px] rounded-md border p-4">
                        <Table >
                            <TableCaption>Danh sách tình trạng chấm công của nhân viên.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead >Mã dự án</TableHead>
                                    <TableHead>Tên dự án</TableHead>
                                    <TableHead>Ngày bắt đầu</TableHead>
                                    <TableHead >Deadline</TableHead>
                                    <TableHead >Trạng thái</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((project) => (
                                        <TableRow key={project.id}>
                                            <TableCell className="font-medium">{project.id}</TableCell>
                                            <TableCell>{project.name}</TableCell>
                                            <TableCell>{project.date}</TableCell>
                                            <TableCell>{project.deadline}</TableCell>
                                            <TableCell>
                                                
                                            {project.status}

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
                    <ScrollArea className="h-[250px] rounded-md border p-4">
                        <Table >
                            <TableCaption>Danh sách task và dự án tương ứng.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead >Mã Task</TableHead>
                                    <TableHead>Tên Task</TableHead>
                                    <TableHead>Tên dự án</TableHead>
                                    <TableHead>Ngày bắt đầu</TableHead>
                                    <TableHead >Deadline</TableHead>
                                    <TableHead >Trạng thái</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {TaskfilteredData.length > 0 ? (
                                    TaskfilteredData.map((task) => (
                                        <TableRow key={task.id}>
                                            <TableCell className="font-medium">{task.id}</TableCell>
                                            <TableCell>{task.name}</TableCell>
                                            <TableCell>{task.projectname}</TableCell>
                                            <TableCell>{task.date}</TableCell>
                                            <TableCell>{task.deadline}</TableCell>
                                            <TableCell>
                                                <Select >
                                                    <SelectTrigger className="w-[120px]">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="finished">Hoàn thành</SelectItem>
                                                        <SelectItem value="unfinished">Đang thực hiện</SelectItem>
                                                    </SelectContent>
                                                </Select></TableCell>
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



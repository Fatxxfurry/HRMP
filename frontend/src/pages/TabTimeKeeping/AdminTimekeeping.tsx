//Thông tin tổng quan cho Admin

"use client"
import * as React from "react"
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Line, LineChart, } from "recharts"
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext"
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

const WorkhourchartConfig = {
    desktop: {
        label: "Giờ làm việc",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig

const WorkhourData = [
    { Day: "Monday", Hour: 8 },
    { Day: "Tuesday", Hour: 10 },
    { Day: "Wednesday", Hour: 5 },
    { Day: "Thursday", Hour: 8 },
    { Day: "Friday", Hour: 8 },
    { Day: "Saturday", Hour: 10 },
]

const AttendancechartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig

const Attendancedata = [
    { id: "1", name: "John Doe", date: "2023-10-01", status: "Đã chấm công" },
    { id: "2", name: "Jane Smith", date: "2023-10-01", status: "Vắng mặt" },
    { id: "3", name: "Alice Johnson", date: "2023-10-01", status: "Đã chấm công" },
    { id: "4", name: "Bob Brown", date: "2023-10-01", status: "Nghỉ phép" },
]
interface AttendanceItem {
    Day: string;
    Attendance: number;
}
interface WorkHourItem {
    Day: string;
    Hour: number;
}
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
interface Employee {
    id: number;
    name: string;
}
interface AttendanceData {
    id: number,
    date: string,
    checkInTime: string,
    checkOutTime: string,
    status: string,
    employee: Employee
}
export default function AdminTimekeeping() {
    const [searchTerm, setSearchTerm] = useState("");
    const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
    const [presentDay, setPresentDay] = useState(0);
    const [lateDay, setlateDay] = useState(0);
    const [attendanceRate, setAttendanceRate] = useState(0);
    const [absentDay, setAbsentDay] = useState(0);
    const [workHourData, setWorkHourData] = useState<WorkHourItem[]>([]);
    const [attendancetimeData, setattendancetimeData] = useState<AttendanceItem[]>([]);
    const { user } = useAuth()
    useEffect(() => {
        loadAttendanceData();
        loadAttendanceHourData();
    }, [user]);
    const loadAttendanceData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/attendence");
            const data = response.data;
            setAttendanceData(data);
            const today = new Date().toISOString().split("T")[0];
            const count: number = data.filter((entry: AttendanceData) =>
                entry.status === "PRESENT"
            ).length;
            const latecount: number = data.filter((entry: AttendanceData) =>
                entry.status === "LATE"
            ).length;
            const totalentry: number = data.length;
            const absentcount: number = data.filter((entry: AttendanceData) =>
                entry.status === "ABSENT"
            ).length;
            setPresentDay(count);
            setlateDay(latecount);
            setAbsentDay(absentcount);
            setAttendanceRate((count / totalentry) * 100);
            console.log("Số ngày có mặt hôm nay:", count);
            const attendanceMap: { [day: string]: number } = {
                Sunday: 0,
                Monday: 0,
                Tuesday: 0,
                Wednesday: 0,
                Thursday: 0,
                Friday: 0,
                Saturday: 0,
            };

            data.forEach((entry: AttendanceData) => {
                if (entry.status !== "PRESENT") return;

                const dateObj = new Date(entry.date);
                const dayName = daysOfWeek[dateObj.getDay()];
                attendanceMap[dayName]++;
            });

            const attendanceCountFinalData: AttendanceItem[] = daysOfWeek.map((day) => ({
                Day: day,
                Attendance: attendanceMap[day],
            }));

            setattendancetimeData(attendanceCountFinalData);
        } catch (error) {
            console.error("Error fetching attendance data:", error);
        }
    }

    // Lọc dữ liệu theo từ khóa
    const filteredData = attendanceData.filter((item) =>
        `${item.id} ${item.employee.name} ${item.status}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );
    const loadAttendanceHourData = async () => {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Chủ nhật tuần này
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Thứ Bảy
        endOfWeek.setHours(23, 59, 59, 999);
        console.log("startOfWeek:", startOfWeek);
        console.log("endOfWeek:", endOfWeek);
        try {
            const response = await axios.get<AttendanceData[]>("http://localhost:8080/api/attendence");
            const data = response.data;

            // Lấy 7 ngày gần nhất (hoặc toàn bộ nếu API giới hạn)
            const hourMap: { [day: string]: number } = {
                Sunday: 0,
                Monday: 0,
                Tuesday: 0,
                Wednesday: 0,
                Thursday: 0,
                Friday: 0,
                Saturday: 0,
            };

            data.forEach((entry) => {
                const entryDate = new Date(entry.date);
                if (entry.status !== "PRESENT") return;
                if (entryDate < startOfWeek || entryDate > endOfWeek) return; // Bỏ nếu không trong tuần này

                const dayName = daysOfWeek[entryDate.getDay()];
                const checkIn = new Date(`${entry.date}T${entry.checkInTime}`);
                const checkOut = new Date(`${entry.date}T${entry.checkOutTime}`);
                const diffHours = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);

                if (!isNaN(diffHours) && diffHours > 0) {
                    hourMap[dayName] += diffHours;
                }
            });


            const finalData: WorkHourItem[] = daysOfWeek.map((day) => ({
                Day: day,
                Hour: Math.round(hourMap[day] * 100) / 100, // làm tròn 2 chữ số thập phân
            }));

            setWorkHourData(finalData);
        } catch (error) {
            console.error("Error loading attendance data:", error);
        }
    };
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                <div className="aspect-video rounded-xl bg-muted/50 p-4" >
                    <span className="font-bold block text-green-500">Đúng giờ</span>
                    <span className="block text-5xl text-green-500">{presentDay}</span>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50 p-4" >
                    <span className="font-bold block text-red-500">Đi muộn </span>
                    <span className="block text-5xl text-red-500">{lateDay}</span>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50 p-4 " >
                    <span className="font-bold block text-cyan-500">Tỉ lệ tham gia </span>
                    <span className="block text-5xl text-cyan-500">{attendanceRate}%</span>
                </div>

                <div className="aspect-video rounded-xl bg-muted/50 p-4" >
                    <span className="font-bold block text-blue-500">Nghỉ phép / vắng </span>
                    <span className="block text-5xl text-blue-500">{absentDay}</span>
                </div>
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                <div className="aspect-video rounded-xl bg-muted/50 p-4">
                    <CardHeader>
                        <CardTitle>Số giờ làm việc trong tuần</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={WorkhourchartConfig}>
                            <BarChart
                                accessibilityLayer
                                data={workHourData}
                                margin={{
                                    top: 20,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="Day"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar dataKey="Hour" fill="var(--color-desktop)" radius={8}>
                                    <LabelList
                                        position="top"
                                        offset={12}
                                        className="fill-foreground"
                                        fontSize={12}
                                    />
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </CardContent>

                </div>




            </div>

            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min overflow-auto max-h-screen" >
                <Input
                    placeholder="Tìm kiếm nhân viên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="m-4 w-full max-w-sm"
                />
                <ScrollArea className="h-[200px] rounded-md border p-4">
                    <Table >
                        <TableCaption>Danh sách tình trạng chấm công của nhân viên.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead >Mã nhân viên</TableHead>
                                <TableHead>Tên nhân viên</TableHead>
                                <TableHead>Ngày</TableHead>
                                <TableHead >Tình trạng</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.length > 0 ? (
                                filteredData.map((attendance) => (
                                    <TableRow key={attendance.id}>
                                        <TableCell className="font-medium">{attendance.employee.id}</TableCell>
                                        <TableCell>{attendance.employee.name}</TableCell>
                                        <TableCell>{attendance.date}</TableCell>
                                        <TableCell>{attendance.status}</TableCell>
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



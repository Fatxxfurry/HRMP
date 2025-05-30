//Thông tin tổng quan cho Employee


"use client"
import * as React from "react"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Line, LineChart, } from "recharts"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext"
import axios from "axios"

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
const AttendancechartData = [
  { Day: "Monday", Attendance: 0 },
  { Day: "Tuesday", Attendance: 1 },
  { Day: "Wednesday", Attendance: 1 },
  { Day: "Thursday", Attendance: 0 },
  { Day: "Friday", Attendance: 1 },
  { Day: "Saturday", Attendance: 1 },
]
const AttendancechartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig


interface AttendanceData {
  id: number,
  date: string,
  checkInTime: string,
  checkOutTime: string,
  status: string,
  employee: Employee
}
interface Employee {
  id: number;
  name: string;
}
interface WorkHourItem {
  Day: string;
  Hour: number;
}
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function EmployeeTimekeeping() {
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [presentDay, setPresentDay] = useState(0);
  const [lateDay, setlateDay] = useState(0);
  const [attendanceRate, setAttendanceRate] = useState(0);
  const [absentDay, setAbsentDay] = useState(0);
  const [workHourData, setWorkHourData] = useState<WorkHourItem[]>([]);
  const { user } = useAuth()

  useEffect(() => {
    loadAttendanceData();
  }, [user]);
  const loadAttendanceData = async () => {
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
      const response = await axios.get("http://localhost:8080/api/attendence");
      const alldata: AttendanceData[] = response.data;
      const data = alldata.filter((entry) => entry.employee.id === user?.id);
      setAttendanceData(data);
      const today = new Date().toISOString().split("T")[0];
      const count: number = data.filter((entry: AttendanceData) =>
        entry.status === "PRESENT"
      ).length;
      const latecount: number = data.filter((entry: AttendanceData) =>
        entry.status === "LATE"
      ).length;
      const totalentry: number = data.length;
      console.log("Tổng số ngày có mặt hôm nay:", totalentry);
      const absentcount: number = data.filter((entry: AttendanceData) =>
        entry.status === "ABSENT"
      ).length;
      setPresentDay(count);
      setlateDay(latecount);
      setAbsentDay(absentcount);
      setAttendanceRate((count / totalentry) * 100);
      console.log("Số ngày có mặt hôm nay:", count);
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
      console.error("Error fetching attendance data:", error);
    }
  }
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
          <span className="font-bold block text-blue-500">Nghỉ phép / vắng</span>
          <span className="block text-5xl text-blue-500">{absentDay}</span>
        </div>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <div className="aspect-video rounded-xl bg-muted/50 p-4" >
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
        {/*<div className="aspect-video rounded-xl bg-muted/50 p-4" >
          <CardHeader>
            <CardTitle>Chấm công trong tuần</CardTitle>
            <CardDescription>07 - 12/04/2025</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={AttendancechartConfig}>
              <LineChart
                accessibilityLayer
                data={AttendancechartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="Day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="Attendance"
                  type="linear"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>

        </div>*/}



      </div>


    </div>
  )
}



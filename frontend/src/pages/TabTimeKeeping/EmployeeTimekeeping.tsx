//Thông tin tổng quan cho Employee


"use client"
import * as React from "react"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Line, LineChart, } from "recharts"


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




export default function EmployeeTimekeeping() {

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <div className="aspect-video rounded-xl bg-muted/50 p-4" >
          <span className="font-bold block text-green-500">Đúng giờ</span>
          <span className="block text-5xl text-green-500">0</span>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 p-4" >
          <span className="font-bold block text-red-500">Đi muộn </span>
          <span className="block text-5xl text-red-500">1</span>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 p-4 " >
          <span className="font-bold block text-cyan-500">Tỉ lệ tham gia </span>
          <span className="block text-5xl text-cyan-500">50%</span>
        </div>

        <div className="aspect-video rounded-xl bg-muted/50 p-4" >
          <span className="font-bold block text-blue-500">Nghỉ phép </span>
          <span className="block text-5xl text-blue-500">1</span>
        </div>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <div className="aspect-video rounded-xl bg-muted/50 p-4" >
          <CardHeader>
            <CardTitle>Số giờ làm việc trong tuần</CardTitle>
            <CardDescription>07 - 12/04/2025</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={WorkhourchartConfig}>
              <BarChart
                accessibilityLayer
                data={WorkhourData}
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
        <div className="aspect-video rounded-xl bg-muted/50 p-4" >
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

        </div>
 
      

      </div>
          
   
    </div>
  )
}



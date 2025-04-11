"use client"
import * as React from 'react'
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
import { format } from "date-fns"
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
import { ScrollArea } from "@/components/ui/scroll-area"

const formSchema = z.object({
    projectname: z.string(),
    taskname: z.string(),
    description: z.string(),
    startdate: z.coerce.date(),
    enddate: z.coerce.date(),
    employeeid: z.string(),
    department: z.string(),
})

const TaskProjectdata = [
    { id: "1", name: "Center a div", projectname: "Website cho FPT", date: "1/1/2024", deadline: "1/1/2025", status: "Hoàn thành", employee: "Nguyễn Văn A", department: "Phòng A" },
    { id: "2", name: "Delete database", projectname: "Website cho FPT", date: "1/1/2024", deadline: "1/1/2025", status: "Đang thực hiện", employee: "Nguyễn Văn A", department: "Phòng A" } ,
    { id: "3", name: "Sell data", projectname: "Website cho FPT", date: "1/1/2024", deadline: "1/1/2025", status: "Đang thực hiện",employee: "NaH",department: "Phòng A"  },
]
export default function AdminAssigntask() {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectname: "",
            taskname: "",
            description: "",
            startdate: new Date(),
            enddate: new Date(),
            employeeid: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                <div className="aspect-auto rounded-xl bg-muted/50 p-4" >
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Tên dự án" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="projecta">Project A</SelectItem>
                            <SelectItem value="projectb">Project B</SelectItem>
                            <SelectItem value="projectc">Project C</SelectItem>
                        </SelectContent>
                    </Select>
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
                                    <TableHead >Nhân viên thực hiện</TableHead>
                                    <TableHead >Phòng ban quản lí</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {TaskProjectdata.length > 0 ? (
                                    TaskProjectdata.map((task) => (
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
                                                <TableCell>{task.employee}</TableCell>
                                                <TableCell>{task.department}</TableCell>

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
            <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                <div className="aspect-video rounded-xl bg-muted/50 p-4" >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Tên project */}
                            <FormField
                                control={form.control}
                                name="projectname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tên Project</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nhập tên project" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Tên task */}
                            <FormField
                                control={form.control}
                                name="taskname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tên Task</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nhập tên task" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Mô tả */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mô tả</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nhập mô tả task" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Ngày bắt đầu */}
                            <FormField
                                control={form.control}
                                name="startdate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Ngày bắt đầu</FormLabel>
                                        <Popover>
                                            <PopoverTrigger >
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? format(field.value, "dd/MM/yyyy") : <span>Chọn ngày</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Deadline */}
                            <FormField
                                control={form.control}
                                name="enddate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Deadline</FormLabel>
                                        <Popover>
                                            <PopoverTrigger >
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? format(field.value, "dd/MM/yyyy") : <span>Chọn ngày</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 z-1000" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Mã nhân viên */}
                            <FormField
                                control={form.control}
                                name="employeeid"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mã nhân viên</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nhập mã nhân viên" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />  
                             <FormField
                                control={form.control}
                                name="department"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phòng ban</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nhập phòng ban quản lí" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-center">
                                <Button type="submit">Giao task</Button>
                            </div>
                        </form>
                    </Form>

                </div>
                <div className="aspect-video rounded-xl bg-muted/50 p-4" >


                </div>



            </div>


        </div>
    )
}

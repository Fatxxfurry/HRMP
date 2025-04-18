import React from 'react'
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function AddEmployee() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4" >
                <span className="font-bold block text-center mb-4">Thêm nhân viên</span>
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <div>
                        <Label >Mã nhân viên</Label>
                        <Input type="text" id="EmployeeID" />
                    </div>
                    <div>
                        <Label >Tên nhân viên</Label>
                        <Input type="text" id="name" />
                    </div>
                    <div>
                        <Label >Số điện thoại</Label>
                        <Input type="text" id="name" />
                    </div>
                    <div>
                        <Label >Email</Label>
                        <Input type="email" id="email" />
                    </div>

                    <div>
                        <Label >Phòng ban</Label>
                        <Input type="text" id="department" />
                    </div>

                    <div>
                        <Label >Vị trí</Label>
                        <Input type="text" id="pos" />
                    </div>

                    <div>
                        <Label htmlFor="picture">Ảnh đại diện</Label>
                        <Input id="picture" type="file" placeholder="asd" />
                    </div>
                    <div>
                        <Label >Giới tính</Label>
                        <Input type="text" id="sex" />
                    </div>
                    <div>
                        <Label >Căn cước</Label>
                        <Input type="text" id="identification" />
                    </div>
                    <div>
                        <Label >Căn cước</Label>
                        <Input type="text" id="identification" />
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <Button type="submit">Thêm</Button>
                </div>
            </div>
        </div>

    )
}

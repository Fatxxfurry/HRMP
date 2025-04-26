//Employye Info: Trang thông tin nhân viên


import React from 'react'
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Card
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, User, Phone, Mail, MapPin, IdCard, ShieldCheck, Building2, BadgeCheck, BriefcaseBusiness, Wallet, Banknote, CalendarClock, Landmark, CreditCard } from "lucide-react"

export default function EmployeeInfo() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center">Thông tin nhân viên</CardTitle>

                        <div className='flex flex-row items-center justify-center '>
                            <div className="flex flex-row items-center justify-center">
                                <Avatar className="w-32 h-32">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <span className='text-xl font-bold p-8'>Nguyễn Văn A</span>

                                <div className="flex flex-col gap-2 text-sm justify-center">
                                    <div>
                                        <span className="text-xl font-light">Work Email: owen.jenkins@horilla.com</span>
                                    </div>
                                    <div>
                                        <span className="text-xl font-light">Work Phone: None</span>
                                    </div>
                                    <div>
                                        <span className="text-xl font-light">Phone: 9876540034</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                            {/* Thông tin cá nhân */}
                            <div className="space-y-3">
                                <h2 className="text-xl font-bold">Thông tin cá nhân</h2>
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} />
                                    <span className="text-xl font-light">Ngày sinh: xx/xx/xxxx</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User size={18} />
                                    <span className="text-xl font-light">Giới tính: Nam</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} />
                                    <span className="text-xl font-light">Quốc gia: Việt Nam</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} />
                                    <span className="text-xl font-light">Địa chỉ: Thủ Đức</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail size={18} />
                                    <span className="text-xl font-light">Email: Thủ Đức</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={18} />
                                    <span className="text-xl font-light">Số điện thoại: Thủ Đức</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <IdCard size={18} />
                                    <span className="text-xl font-light">Căn cước: Thủ Đức</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={18} />
                                    <span className="text-xl font-light">Số BHXH: 123456789</span>
                                </div>
                            </div>

                            {/* Thông tin công việc */}
                            <div className="space-y-3">
                                <h2 className="text-xl font-bold">Thông tin công việc</h2>
                                <div className="flex items-center gap-2">
                                    <Building2 size={18} />
                                    <span className="text-xl font-light">Phòng ban: IT</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BadgeCheck size={18} />
                                    <span className="text-xl font-light">Loại nhân viên: Full-time</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User size={18} />
                                    <span className="text-xl font-light">Quản lí: Phạm Mạnh Kha</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BriefcaseBusiness size={18} />
                                    <span className="text-xl font-light">Vị trí: Backend Developer</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Wallet size={18} />
                                    <span className="text-xl font-light">Lương cơ bản: 5,000,000</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CalendarClock size={18} />
                                    <span className="text-xl font-light">Ngày bắt đầu: 1/1/2009</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Landmark size={18} />
                                    <span className="text-xl font-light">Tên ngân hàng: BIDV</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CreditCard size={18} />
                                    <span className="text-xl font-light">Số tài khoản: 123456789</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

    )
}

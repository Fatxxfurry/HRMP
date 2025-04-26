//Trang Admin Request hiển thị các request được gửi bới nhân viên, admin có thể chấp nhận hoặc từ chối request

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import RequestHistory from "@/components/defined/RequestHistory"
import NotificationHistory from "@/components/defined/NotificationHistory"

export default function AdminRequest() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
            <span className="font-bold block text-center mb-4">Quản lí yêu cầu của nhân viên</span>

                <RequestHistory Header="Yêu cầu tăng lương" Date="1/1/2025" Sender="Trưởng phòng Kha" Status="Chấp nhận" />
                <RequestHistory Header="Yêu cầu trả tiền bảo hiểm" Date="1/1/2025" Sender="Trưởng phòng Kha" Status="Chấp nhận" />
            </div>
        </div>
    )
}

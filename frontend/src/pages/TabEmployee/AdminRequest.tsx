import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import NotificationHistory from "@/components/defined/NotificationHistory"

export default function AdminRequest() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
                <NotificationHistory Header="Yêu cầu tăng lương" Date="1/1/2025" Sender="Trưởng phòng Kha" />
                <NotificationHistory Header="Yêu cầu trả tiền bảo hiểm" Date="1/1/2025" Sender="Trưởng phòng Kha"  />
            </div>
        </div>
    )
}

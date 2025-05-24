import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Download } from "lucide-react"
import { useLocation } from 'react-router'



export interface NotificationDetailProps {
  senderName: string;
  senderEmail: string;
  department: string;
  content: string;
  title: string;
  date: string;
}

export default function NotificationDetail() {
  const location = useLocation()
  const notification = location.state as NotificationDetailProps


  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết thông báo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Người gửi</p>
            <p className="text-lg font-medium">{notification?.senderName}</p>
          </div>

          <Separator />

          <div>
            <p className="text-sm text-muted-foreground">Email người gửi</p>
            <p className="text-base">{notification?.senderEmail}</p>
          </div>

          <Separator />

          <div>
            <p className="text-sm text-muted-foreground">Ngày gửi</p>
            <p className="text-base">{notification?.date}</p>
          </div>

          <Separator />
          <div>
            <p className="text-sm text-muted-foreground">Phòng ban</p>
            <p className="text-base">{notification?.department}</p>
          </div>

          <Separator />

          <div>
            <p className="text-sm text-muted-foreground">Nội dung</p>
            <p className="text-base whitespace-pre-line">{notification?.content}</p>
          </div>


        </CardContent>
      </Card>
    </div>
  )
}

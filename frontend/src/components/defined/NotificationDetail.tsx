import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Download } from "lucide-react"

type Attachment = {
  name: string
  url: string
}

export interface NotificationDetailProps {
  NotificationData: {
    senderName: string
    senderEmail: string
    department: string
    content: string
    attachments: Attachment[]
  }
}

export default function NotificationDetail({ NotificationData }: NotificationDetailProps) {
  const {
    senderName,
    senderEmail,
    department,
    content,
    attachments,
  } = NotificationData

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Card>
          <CardHeader>
            <CardTitle>Chi tiết thông báo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Người gửi</p>
              <p className="text-lg font-medium">{senderName}</p>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground">Email người gửi</p>
              <p className="text-base">{senderEmail}</p>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground">Phòng ban</p>
              <p className="text-base">{department}</p>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground">Nội dung</p>
              <p className="text-base whitespace-pre-line">{content}</p>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground mb-2">File đính kèm</p>
              {attachments.length > 0 ? (
                <ul className="space-y-2">
                  {attachments.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-muted p-3 rounded-md"
                    >
                      <span>{file.name}</span>
                      <a
                        href={file.url}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Tải xuống
                        </Button>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-sm">Không có file đính kèm.</p>
              )}
            </div>
          </CardContent>
        </Card>
    </div>
  )
}

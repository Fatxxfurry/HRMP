import React, {useState} from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Download } from "lucide-react"

type Attachment = {
  name: string
  url: string
}
var attachments: Attachment[] = []

export interface NotificationDetailProps {
  NotificationData: {
    senderName: string
    senderEmail: string
    department: string
    content: string
    attachments: Attachment[]
  }
}

export default function RequestDetail() {

  const [status, setStatus] = useState<"pending" | "accepted" | "rejected">("pending")

  const handleAccept = () => setStatus("accepted")
  const handleReject = () => setStatus("rejected")
    return (

    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Card>
          <CardHeader>
            <CardTitle>Chi tiết yêu cầu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Người gửi</p>
              <p className="text-lg font-medium">Kha</p>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground">Email người gửi</p>
              <p className="text-base">edmgvn@gmail.com</p>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground">Phòng ban</p>
              <p className="text-base">Phòng IT</p>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground">Nội dung</p>
              <p className="text-base whitespace-pre-line">abcxyz</p>
            </div>

            <Separator />
            <div>
            <p className="text-sm text-muted-foreground">Trạng thái</p>
            <p className="text-base font-medium">
              {status === "pending"
                ? "Chưa xử lý"
                : status === "accepted"
                ? "Đã chấp nhận"
                : "Đã từ chối"}
            </p>
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
            {status === "pending" && (
            <div className="flex gap-4 pt-4">
              <Button onClick={handleAccept} className="bg-green-600 hover:bg-green-700">
                Chấp nhận
              </Button>
              <Button onClick={handleReject} variant="destructive">
                Từ chối
              </Button>
            </div>
          )}
          </CardContent>
        </Card>
    </div>
  )
}

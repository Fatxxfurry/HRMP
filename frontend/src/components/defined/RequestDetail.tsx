import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Download } from "lucide-react"
import { useLocation } from 'react-router'
import axios from "axios"

export interface RequestDetailProps {
  senderName: string,
  senderContent: string,// Có thể truyền dynamic nếu có
  senderdepartment: string,          // Có thể truyền dynamic nếu có
  senderStatus: string,
  senderHeader: string,
  senderDate: string
  requestsID: number
}


export default function RequestDetail() {

  const location = useLocation()
  const requestinfo = location.state as RequestDetailProps
  const [status, setStatus] = useState(requestinfo.senderStatus)

  const handleAccept = async () => {
    const updatedStatus = "APPROVED";
    setStatus(updatedStatus);

    const payload = {
      status: updatedStatus,
    };
    try {
      const response = await axios.put(`http://localhost:8080/api/requests/${requestinfo.requestsID}`, payload)
      alert("Cập nhật trạng thái thành công")
      if (!response) {
        throw new Error('Failed to update status')
      }
    } catch (error) {
      console.error('Error update status:', error)
    }
  }
  const handleReject = async () => {
    const updatedStatus = "REJECTED";
    setStatus(updatedStatus);

    const payload = {
      status: updatedStatus,
    };
    try {
      const response = await axios.put(`http://localhost:8080/api/requests/${requestinfo.requestsID}`, payload)
      alert("Cập nhật trạng thái thành công")
      if (!response) {
        throw new Error('Failed to update status')
      }
    } catch (error) {
      console.error('Error update status:', error)
    }
  }
  return (

    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết yêu cầu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Người gửi</p>
            <p className="text-lg font-medium">{requestinfo.senderName}</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground">Phòng ban</p>
            <p className="text-base">{requestinfo.senderdepartment}</p>
          </div>

          <Separator />
          <div>
            <p className="text-sm text-muted-foreground">Tiêu đề</p>
            <p className="text-base whitespace-pre-line">{requestinfo.senderHeader}</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground">Nội dung</p>
            <p className="text-base whitespace-pre-line">{requestinfo.senderContent}</p>
          </div>

          <Separator />
          <div>
            <p className="text-sm text-muted-foreground">Trạng thái</p>
            <p className="text-base font-medium">
              {status}
            </p>
          </div>
          <Separator />
          {status === "PENDING" && (
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

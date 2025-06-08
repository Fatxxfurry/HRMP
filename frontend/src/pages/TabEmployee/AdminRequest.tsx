//Trang Admin Request hiển thị các request được gửi bới nhân viên, admin có thể chấp nhận hoặc từ chối request

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import RequestHistory from "@/components/defined/RequestHistory"
import NotificationHistory from "@/components/defined/NotificationHistory"
import { Label } from "@/components/ui/label"
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'
import axios from "axios"
interface request {
    id: number
    name: string,
    requestDate: string,
    description: string,
    employee: {
        id: number,
        name: string,
    }
    department: {
        name: string,
        managerId: number
    },
    status: string
}
export default function AdminRequest() {
    const [allRequest, setAllRequest] = useState<request[]>([]);
    const { user } = useAuth();
    useEffect(() => {
        if (user?.id) {
            loadDepartmentRequest()
        }
    }, [user])
    const loadDepartmentRequest = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/requests`)
            if (!response) {
                throw new Error('Failed to fetch department request info')
            }
            const data: request[] = response.data
            const filtereddata = data.filter(request => request.department?.managerId === user?.id)

            console.log("my loadDepartmentRequest: ", data)
            setAllRequest(filtereddata)
        } catch (error) {
            console.error('Error fetching salary info:', error)
        }
    }
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-[#F0F0EF] md:min-h-min" >
                <span className="font-bold block text-center m-4 text-xl">Quản lí yêu cầu của nhân viên</span>
                {allRequest.length > 0 ? (
                    allRequest.map((request) => (
                        <RequestHistory
                            key={request.id}
                            requestID={request.id}
                            Header={request.name}
                            Date={request.requestDate}
                            Sender={request?.employee.name || "Unknown"}
                            Content={request.description}
                            Status={request.status}
                            Department={request?.department?.name || "Unknown"}
                        />
                    ))
                ) : (
                    <div className="p-4 text-gray-500">No notifications found.</div>
                )}
            </div>
        </div>
    )
}

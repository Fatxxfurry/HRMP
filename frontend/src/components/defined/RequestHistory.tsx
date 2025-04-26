import React from 'react'
import { Bell } from 'lucide-react';
import { Link } from "react-router"
import { useAuth } from '@/context/AuthContext';
interface NotificationHistoryProps {
    Header?: string;
    Date?: string; // hoặc kiểu phù hợp tùy vào cách bạn dùng
    Sender?: string; // hoặc kiểu phù hợp tùy vào cách bạn dùng
    Status?: string;
}

export default function RequestHistory({ Header, Date, Sender, Status }: NotificationHistoryProps) {
    const { user } = useAuth();

    const role = user?.role === 'admin' ? 'admin' : 'user';
    const path = `/${role}/request-detail`;

    return (
        <Link to={path} style={{ textDecoration: 'none' }}>
            <div className="flex flex-row gap-4 p-4 pt-0 m-4 bg-gray-200 rounded-lg">
                <div className="flex items-center">
                    <Bell />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <span className="font-bold text-lg ">
                        {Header}
                    </span>
                    <span>
                        {Date}
                    </span>
                </div>
                <div className="flex flex-col gap-2 mt-2 text-right ml-auto"> {/* Thêm ml-auto */}
                    <span className="text-gray-500 mt-2">
                        Người gửi: {Sender}
                    </span>
                    <span className="text-green-600 mt-2">
                        Tình trạng: {Status}
                    </span>
                </div>
            </div>
        </Link>
    )
}

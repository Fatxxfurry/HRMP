import React from 'react'
import { Bell } from 'lucide-react';
import {Link} from "react-router"
import { useAuth } from '@/context/AuthContext';
interface NotificationHistoryProps {
    Header?: string;
    Date?: string; // hoặc kiểu phù hợp tùy vào cách bạn dùng
    Sender?: string; // hoặc kiểu phù hợp tùy vào cách bạn dùng
}

export default function NotificationHistory({ Header, Date, Sender }: NotificationHistoryProps) {
    const { user } = useAuth();

    const role = user?.role === 'admin' ? 'admin' : 'user'; 
    const path = `/${role}/notification-detail`;

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
            <span className="flex-1 text-right text-gray-500 mt-2">
                    Người gửi: {Sender}
            </span>
        </div>
        </Link>
    )
}
